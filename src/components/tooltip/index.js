import React from 'react';
import PopView from '../popview';
import Theme from '../theme';
import './index.less';

export default class ToolTip extends React.Component{

    _getArrowLeft = (params)=>{
        let style = null;
        if(params.placement==='topleft'){
            style = { left:params.rect.width/2};
        }else if(params.placement==='topright'){
            style = { right:params.rect.width/2};
        }else if(params.placement==='righttop'){
            style = { bottom:params.rect.height/2};
        }else if(params.placement==='rightbottom'){
            style = { top:params.rect.height/2};
        }else if(params.placement ==='bottomleft'){
            style = { right:params.rect.width/2};
        }else if(params.placement ==='bottomright'){
            style = { left:params.rect.width/2};
        }

        if(style === null){
            return {};
        }
        return { style }
    }
    renderPopView(params){
        const clsArr = ['xz-tooltip-wrapper']
        if(this.props.overlayClassName){
            clsArr.push(this.props.overlayClassName);
        }
        const arrowStyle = this._getArrowLeft(params);
        return <div className={clsArr.join(' ')}>
            <div {...arrowStyle} className={`xz-tooltip-arrow xz-tooltip-arrow-${params.placement}`}></div>
            <div className='xz-tooltip-inner'>ToolTipToolTip<div/>ToolTipToolTip</div>
        </div>;
    }
    onChange(){

    }
    onShow(){
        console.log("show");
    }
    onHide(){
        console.log("hide");
    }
    render(){
        return (
                <PopView 
                    mode='hover' 
                    {...this.props}
                    ref={(instance)=>{this.root = instance;}}
                    mouseLeaveHide={true} 
                    onShow = {this.onShow.bind(this)}
                    onHide = {this.onHide.bind(this)}
                    renderContent={this.renderPopView.bind(this)}
                >
                    {this.props.children}
                </PopView>)
        ;
    }
}