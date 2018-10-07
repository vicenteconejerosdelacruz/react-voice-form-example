import React, { Component } from 'react'

import './App.css'
import SpeechRecognitionService from './SpeechRecognitionService'
import VoiceFormExample from './VoiceFormExample'

class App extends Component {
	
	constructor(props){
		super(props);
		this.recognition = new SpeechRecognitionService();
		this.state = {
			recording:false,
            speechResult: null,
            serviceList: [
                { name: 'primera visita' },
                { name: 'consulta' },
            ]
		}
	}
	
	componentDidMount(){
	}	
	
	startRecording = () => {
        this.recognition.onResult((speechResult, isFinal) => {
            this.setState({ speechResult: speechResult.trim() })
		});
		this.recognition.onEnd(() => {
		  this.setState({ recording: false })
		});
		this.recognition.start();
		this.setState({ recording: true })
	}

	stopRecording = () => {
		this.setState({ recording: false })
		this.recognition.stop()
	}

	toggleRecording = () => {
		this.state.recording ? this.stopRecording() : this.startRecording()
	}
	  
	render() {
		return (
			<div className="App container">
				<VoiceFormExample 
					//audio stuff
                    onToggleRecording={this.toggleRecording}
                    recording={this.state.recording}
                    result={this.state.speechResult}
                    serviceList={this.state.serviceList}
				/>
			</div>
		)
	}
}

export default App
