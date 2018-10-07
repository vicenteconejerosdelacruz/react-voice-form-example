import React, { Component } from 'react';

class VoiceToButtonInput extends Component {

	componentDidUpdate(prevProps) {
		//to be sure to process just once
		if(prevProps.result !== this.props.result){
			if(this.props.result === this.props.hint){
				this.props.onClick()
			}			
		}
	}	
	
	render(){
	  return React.Children.map(this.props.children, (child, i)=>{
		  
		let el = React.cloneElement(child,{
		  onClick:this.props.onClick
		})
		return el
	  })
	}
}

export default VoiceToButtonInput;
