import React, { useState } from 'react';
import './VoiceButton.css';
import Amplify from 'aws-amplify';
import mic from 'microphone-stream';
import awsconfig from '../aws-exports';


Amplify.configure(awsconfig);

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

export default VoiceButton;