import React, { useState } from 'react';
import awsconfig from '../aws-exports';
import Navbar from './Navbar';
import './App.css';
import mic from 'microphone-stream';

import Amplify, { Interactions, Predictions } from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
Amplify.addPluggable(new AmazonAIPredictionsProvider());

Amplify.configure(awsconfig);

const botName = awsconfig.aws_bots_config[0].name;

const App = () => {
    const [transcribed, setTranscribed] = useState("Hello");
    const [msg, setMsg] = useState("");

    const [msgSet, setMsgSet] = useState([]);

    function onChange(event) {
        setMsg(event.target.value);
    }

    const VoiceButton = ({ onStop }) => {
        const [recording, setRecording] = useState(false);
        const [micStream, setMicStream] = useState();
        const [audioBuffer] = useState(
            (function () {
                let buffer = [];
                function add(raw) {
                    buffer = buffer.concat(...raw);
                    return buffer;
                }
                function newBuffer() {
                    console.log("reseting buffer");
                    buffer = [];
                }

                return {
                    reset: function () {
                        newBuffer();
                    },
                    addData: function (raw) {
                        return add(raw);
                    },
                    getData: function () {
                        return buffer;
                    }
                };
            })()
        );

        async function startRecording() {
            console.log('start recording');
            audioBuffer.reset();

            window.navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
                const startMic = new mic();

                startMic.setStream(stream);
                startMic.on('data', (chunk) => {
                    var raw = mic.toRaw(chunk);
                    if (raw == null) {
                        return;
                    }
                    audioBuffer.addData(raw);

                });

                setRecording(true);
                setMicStream(startMic);
            });
        }

        async function stopRecording() {
            console.log('stop recording');

            micStream.stop();
            setMicStream(null);
            setRecording(false);

            const resultBuffer = audioBuffer.getData();

            console.log(resultBuffer);

            if (typeof onStop === "function") {
                onStop(resultBuffer);
            }
        }

        return (
            <div className="voice-container">
                {!recording &&
                    <button className="voice" onClick={startRecording}>
                        <i className="material-icons">keyboard_voice</i>
                    </button>
                }
                {recording &&
                    <button className="voice" onClick={stopRecording}>
                        <i className="material-icons">stop</i>
                    </button>
                }
            </div>
        );
    }

    async function exportBuffer(bytes) {
        Predictions.convert({
            transcription: {
                source: {
                    bytes
                },
            },
        }).then(({ transcription: { fullText } }) => setTranscribed(fullText))
            .catch(err => setTranscribed(JSON.stringify(err, null, 2)));

        updateChat(transcribed);
    }

    function updateChat(msg) {
        Interactions.send(botName, msg).then(resp => {
            setMsgSet([...msgSet, { msg: msg, resp: resp.message }]);

            Predictions.convert({
                textToSpeech: {
                    source: {
                        text: resp.message
                    },
                    voiceId: "Matthew"
                }
            }).then(result => {
                var uInt8Array = new Uint8Array(result.audioStream);
                var arrayBuffer = uInt8Array.buffer;
                var blob = new Blob([arrayBuffer]);
                var url = URL.createObjectURL(blob);

                const audio = new Audio(url)
                audio.play();
            }).catch(err => console.log(JSON.stringify(err, null, 2)))
        });

    }

    return (
        <div className="app">
            <section className="messages-wrapper">
                {
                    msgSet.map((n, i) => {
                        return (
                            <div>
                                <div key={i} className="message from">{n.msg}</div>
                                <div key={i + 1} className="message to">{n.resp}</div>
                            </div>
                        )
                    })
                }
            </section>
            <input name="msg" onChange={onChange} value={msg} className="msgBox"></input>
            <button onClick={() => updateChat(msg)} className="sendBtn">Send</button>
            <VoiceButton onStop={exportBuffer}></VoiceButton>
            <Navbar></Navbar>
        </div>
    );
}

export default App;