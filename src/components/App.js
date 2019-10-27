import React, { useState } from 'react';
import awsconfig from '../aws-exports';
import Navbar from './Navbar';
import VoiceButton from './VoiceButton';
import './App.css';

import Amplify, { Interactions, Predictions } from 'aws-amplify';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';

Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

const botName = awsconfig.aws_bots_config[0].name;


const App = () => {
    const [utters, setUtters] = useState([]);
    const[responses, setResponses] = useState([]);
    const [transcribed, setTranscribed] = useState("");
    const [msg, setMsg] = useState("");

    function onChange(event) {
        setMsg(event.target.value);
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
        setUtters([...utters, msg]);
        Interactions.send(botName, msg).then(resp => setResponses([...responses, resp.message]));
    }

    return (
        <div className="app">
            <section>
                {
                    utters.map((utter, i) => <div key={i}>{utter}</div>)
                }
            </section>
            <VoiceButton onStop={exportBuffer} addUtter={setUtters}></VoiceButton>
            <input name="msg" onChange={onChange} value={msg}></input>
            <button onClick={() => updateChat(msg)}>Send</button>
            <section>
                {
                    responses.map((resp, i) => <div key={i}>{resp}</div>)
                }
            </section>
            <Navbar></Navbar>
        </div>
    );
}

export default App;