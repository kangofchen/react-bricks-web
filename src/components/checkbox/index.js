//https://www.html5tricks.com/demo/jiaoben1503/index.html
import React from 'react';
import './index.less'

export default class CheckBox extends React.Component {
    // true false indeterminate
    constructor(props){
        super(props);
        this.state = {
            value:this.prepareValue(props.value)
        };
    }

    prepareValue = (val)=>{
        if(!val){
            return false;
        }else if(val ==='indeterminate'){
            return 'indeterminate';
        }else if(val === true){
            return true;
        }
        return false;
    }
    render(){
        return <label className={`xz-checkbox xz-checkbox-${this.state.value.toString()}`}>
            <span className='xz-checkbox-inner'></span>
            <span className='xz-checkbox-label xz-checkbox-label-left'>checkbox</span>
            </label>
    }

}