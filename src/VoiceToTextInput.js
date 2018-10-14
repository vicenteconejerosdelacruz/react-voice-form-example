import React, { Component } from 'react';
const ReactDOM = require('react-dom')

class VoiceToTextInput extends Component {
	constructor(props) {
		super(props);
		this.myRef = null
	}
	
	setRef = ref => {
		this.myRef = ref
	};	
	
	componentDidUpdate(prevProps) {
		//to be sure to process just once
		if(prevProps.result !== this.props.result){
			if(this.props.result.toLowerCase() === this.props.hint.toLowerCase()){
				this.myRef.focus()
			} else if ( document.activeElement === ReactDOM.findDOMNode(this.myRef) ){
				if(this.props.result !==  '...'){
					this.props.onChange({target:{name:this.props.name, value:this.props.result.toLowerCase()}})
					this.myRef.blur()
				}
			}			
		}
	}	
	
	render(){
	  return React.Children.map(this.props.children, (child, i)=>{
		let el = React.cloneElement(child,{
		  ref:this.setRef,
		  onChange:this.props.onChange,
		  value:this.props.value,
		  name:this.props.name
		})
		return el
	  })
	}
}

export default VoiceToTextInput;
