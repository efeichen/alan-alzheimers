import React from 'react';
import awsconfig from '../aws-exports';
import Navbar from './Navbar';
import VoiceButton from './VoiceButton';
import './App.css';

import Amplify, { Interactions } from 'aws-amplify';
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';
import { LexRuntime } from 'aws-sdk/clients/all';

Amplify.configure(awsconfig);

const botName = awsconfig.aws_bots_config[0].name;
const lex = new LexRuntime();
lex.postContent()


const response = Interactions.send(botName, "hello");

response.then(res => console.log(res));

const App = () => {
    return (
        <div className="app">
            <VoiceButton></VoiceButton>
            <Navbar></Navbar>
        </div>
    );
}

export default App;