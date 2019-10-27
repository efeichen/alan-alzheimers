import React, { Component } from 'react';
import Amplify, { Interactions } from 'aws-amplify';
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

// Imported default theme can be customized by overloading attributes
const myTheme = {
    ...AmplifyTheme,
    sectionHeader: {
        ...AmplifyTheme.sectionHeader,
        backgroundColor: '#ff6600'
    }
};

class App extends Component {

    handleComplete(err, confirmation) {
        if (err) {
            alert('Bot conversation failed')
            return;
        }

        alert('Success: ' + JSON.stringify(confirmation, null, 2));
        return 'Trip booked. Thank you! what would you like to do next?';
    }

    render() {
        return (
            <div className="App">
                <ChatBot
                    title="My Bot"
                    theme={myTheme}
                    botName="alan_master_master"
                    welcomeMessage="Welcome, how can I help you today?"
                    onComplete={this.handleComplete.bind(this)}
                    clearOnComplete={true}
                    conversationModeOn={false}
                />
            </div>
        );
    }
}

export default App;