import React, { Component } from 'react';
const ReactDOM = require('react-dom')

class VoiceToListInput extends Component {
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
			if(this.props.result === this.props.hint){
				this.myRef.childNodes[0].click()
			} else if ( document.activeElement === ReactDOM.findDOMNode(this.myRef.childNodes[0]) ){
				if(this.props.result !==  '...'){
					if(this.props.items.some(item => item.name === this.props.result)){
						this.props.onChange(this.props.result)
						this.myRef.childNodes[0].click()
					}
				}
			}			
		}
	}	
	
	render(){
	  return React.Children.map(this.props.children, (child, i)=>{
		  
		let el = React.cloneElement(child,{
		  ref:this.setRef,
		  onChange:this.props.onChange,
		  value:this.props.value
		})
		return el
	  })
	}
}

export default VoiceToListInput;
