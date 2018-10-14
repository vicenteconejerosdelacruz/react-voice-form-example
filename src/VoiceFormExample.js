import React, { Component } from 'react';

import VoiceToButtonInput from './VoiceToButtonInput';
import VoiceToListInput from './VoiceToListInput';
import VoiceToTextInput from './VoiceToTextInput';

/*

Author: @vichoconejeros

How to use this

<VoiceToTextInput hint="teléfono" name="phone" result={this.props.result} value={this.state.phone} onChange={this.onChange} >
	<input className="span6 form-control h-100 w-100" rows="3" placeholder="9XXXXXXXX" required ></input>
</VoiceToTextInput>

*/

class VoiceFormExample extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name:'',
			phone:'',
			service:''
		}	
	}

	componentDidMount(){
	}
	
	
	onChange = (e) => {
		let state = { ...this.state }
		state[e.target.name] = e.target.value;
		this.setState({ ...state });
	}

	guardar = () => {
		//do stuff here
	}

	borrar = () => {
		this.setState({ name: '', phone: '', service: '' })
	}

	render() {
		const customStyles = {
			content : {
				top			: '10%',
				left		: '30%',
				right		: '30%',
				bottom	: 'auto',
			},
			overlay: {
				zIndex: 1000
			}
		};
		
		let onServiceSelect = (service) => {
			this.onChange({target:{name:'service', value:service}})
		}		
		
		let ServiceSelection = (props) => {
			return (
				<li>
					<a href="#" onClick={(e) => {onServiceSelect(props.name)}}>{props.name}</a>
				</li>
			)
		}	

		let micStyle = { color: ((this.props.recording) ? "rgba(255, 0, 0, 255)" : "rgba(0, 0, 0, 255)") }
		
		return (
			<div style={customStyles}>
			
				<div className="row">
					<div className="col-12 text-center">
						<p><i className="fa fa-microphone" aria-hidden="true" style={micStyle} onClick={this.props.onToggleRecording}></i>{this.props.result}</p>
					</div>
				</div>

				<div className="row">
					<div className="col-12">
						<span className="align-text-bottom"><strong>Nombre</strong></span>
					</div>
					<div className="col-12">
						<VoiceToTextInput hint="nombre" name="name" result={this.props.result} value={this.state.name} onChange={this.onChange} >
							<input className="span6 form-control h-100 w-100" rows="3" placeholder="Nombre" required />
						</VoiceToTextInput>							
					</div>
				</div>
					
				<div className="row">
					<div className="col-12">
						<span className="align-text-bottom"><strong>Telefono</strong></span>
					</div>
					<div className="col-12">
						<VoiceToTextInput hint="teléfono" name="phone" result={this.props.result} value={this.state.phone} onChange={this.onChange} >
							<input className="span6 form-control h-100 w-100" rows="3" placeholder="9XXXXXXXX" required ></input>
						</VoiceToTextInput>
					</div>
				</div>
			
				<div className="row">
					<div className="col-12">
						<span className="align-text-bottom"><strong>Servicio</strong></span>
					</div>
					<div className="col-12">			
						<VoiceToListInput hint="servicio" name="service" result={this.props.result} value={this.state.service} items={this.props.serviceList} onChange={onServiceSelect} >
							<div className="dropdown">						  
								<button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" name="service">{this.state.service}
									<span className="caret"></span>
								</button>
								<ul className="dropdown-menu">
									{ this.props.serviceList.map( (service,index) => <ServiceSelection key={index} {...service} /> ) }
								</ul>
							</div>
						</VoiceToListInput>
					</div>
				</div>

				<div className="row" style={{ 'paddingTop': '10%' }}>
					<div className="col-6 text-center">
						<VoiceToButtonInput hint="guardar" result={this.props.result} onClick={this.guardar}>
							<input type="button" className="btn btn-primary" value="Guardar"></input>
						</VoiceToButtonInput>
					</div>
					<div className="col-6 text-center">
						<VoiceToButtonInput hint="borrar" result={this.props.result} onClick={this.borrar}>
							<input type="button" className="btn btn-danger" value="Borrar"></input>
						</VoiceToButtonInput>
					</div>
				</div>

			</div>
		)
	}
}

export default VoiceFormExample;
