import React, { Component } from 'react';
const ReactDOM = require('react-dom')

//SPLIT THIS INTO
//VoiceToTextInput
//VoiceToListInput
//VoiceToButtonInput
//VoiceTo...Input

class VoiceInput extends Component {
	constructor(props) {
		super(props);
		this.myRef = null
	}
	
    setRef = ref => {
      this.myRef = ref
    };	
	
	onChange = (e) => {
		this.props.onChange(e)
	}
	
	renderText = () =>{
	  return React.Children.map(this.props.children, (child, i)=>{
		  
		let el = React.cloneElement(child,{
		  value:this.props.value,
		  type:this.props.type,
		  ref:this.setRef,
		  type:"text",
		  onChange:this.onChange
		})
		return el
	  })
	}
	
	renderList = () =>{
	  return React.Children.map(this.props.children, (child, i)=>{
		  
		let el = React.cloneElement(child,{
		  value:this.props.value,
		  onChange:this.onChange,
		  ref:this.setRef,
		})
		return el
	  })
	}	
	
	renderButton = () =>{
	  return React.Children.map(this.props.children, (child, i)=>{
		  
		let el = React.cloneElement(child,{
		  onClick:this.props.onClick
		})
		return el
	  })
	}		
	
	componentDidUpdateText(prevProps){
		//to be sure to process just once
		if(prevProps.result !== this.props.result){
			if(this.props.result === this.props.hint){
				//console.log(this.props.children)
				this.myRef.focus()
			} else if ( document.activeElement === ReactDOM.findDOMNode(this.myRef) ){
				if(this.props.result !==  '...'){
					this.onChange({target:{name:this.props.name, value:this.props.result}})
					this.myRef.blur()
				}
			}			
		}
	}
	
	componentDidUpdateList(prevProps){
		//to be sure to process just once
		if(prevProps.result !== this.props.result){
			if(this.props.result === this.props.hint){
				this.myRef.childNodes[0].click()
			} else if ( document.activeElement === ReactDOM.findDOMNode(this.myRef.childNodes[0]) ){
				if(this.props.result !==  '...'){
					if(this.props.items.some(item => item.name === this.props.result)){
						this.onChange(this.props.result)
						this.myRef.childNodes[0].click()
					}
					
				}
			}			
		}
	}	
	
	componentDidUpdateButton(prevProps){
		//to be sure to process just once
		if(prevProps.result !== this.props.result){
			if(this.props.result === this.props.hint){
				this.props.onClick()
			}			
		}
	}		
	
	componentDidUpdate(prevProps) {
		switch(this.props.type){
			case "text": 
				return this.componentDidUpdateText(prevProps)
			break
			case "list": 
				return this.componentDidUpdateList(prevProps)
			break
			case "button": 
				return this.componentDidUpdateButton(prevProps)
			break			
		}
	}	
	
	render(){
		switch(this.props.type){
			case "text": 
				return this.renderText() 
			break
			case "list": 
				return this.renderList() 
			break
			case "button": 
				return this.renderButton() 
			break
		}
	}
}

export default VoiceInput;
