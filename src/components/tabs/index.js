import React from 'react';
import Theme from '../theme';
import XZ from '../xz';
import './index.less';
import observer from '../observer';

//https://github.com/mobxjs/mobx/issues/101

@observer
class ConatinerItem extends React.Component {
    render(){
        return <div>{this.props.renderItem(this.props.pkey)}</div>
    }
}

const getSelectedKey = (selectedKey,data) => {

    return selectedKey;
}

@observer
class Container extends React.Component {
    constructor(props) {
      super(props)
      this.dict = {};
      var curSelectedKey = getSelectedKey(props.selectedKey,props.data||[]);
      this.state = {
          selectedKey:curSelectedKey
      };
      this.createItem(curSelectedKey,props.data||[]);
    }

    createItem = (selectedKey,data)=>{
        if(this.props.cache){
            for(var key in this.dict){
                var isExistsInDict = false;
                for(var i=0,j=data.length;i<j;i+=1){
                    if(key === data[i].key){
                        isExistsInDict = true;
                        break;
                    }
                }
                if(!isExistsInDict){
                    delete this.dict[key];
                }
            }
            if(this.dict[selectedKey]){
                return;
            }
        }
        this.dict[selectedKey] = <ConatinerItem pkey={selectedKey} {...this.props} container={this}/>
    }
   
    componentWillReceiveProps(nextProps){
      const curSelectedKey = getSelectedKey(nextProps.selectedKey,nextProps.data||[]);
      if(curSelectedKey!==this.state.selectedKey){
        this.createItem(curSelectedKey,nextProps.data||[]);
        this.setState({
            selectedKey:curSelectedKey
        });
      }
    }
  
  
    render() {
      var re = [];
      var className = ["xz-tabs_container-default"];
      if(this.props.className){
        className.push(this.props.className);
      }else{
        className.push("xz-tabs-container");
      }
      if(this.props.cache===true){
        for(var key in this.dict){
          if(key===this.state.selectedKey){
            re.push(<div key={key+"_containerwrapper"}>{this.dict[key]}</div>);
          }else{
            re.push(<div key={key+"_containerwrapper"} style={{display:"none"}}>{this.dict[key]}</div>);
          }
        }
      }else{
        re = this.dict[this.state.selectedKey];
      }
      
      return (<div className={className.join(" ")}>{re}</div>);
    }
  }

@observer
export default class Tabs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedKey: getSelectedKey(props.selectedKey,props.data)
        };
        this.itemsDict = {};
        this.renderIndicatorTimeout = null;
    }

    componentWillUnmount(){
        this._clearTimeout();
    }

    _clearTimeout(){
        if(this.renderIndicatorTimeout){
            window.clearTimeout(this.renderIndicatorTimeout);
            this.renderIndicatorTimeout = null;
        }
    }

    componentWillReceiveProps(nextProps){
        var curKey = getSelectedKey(nextProps.selectedKey,nextProps.data)
        if(curKey!==this.state.selectedKey){
            this.setState({
                selectedKey: curKey
            });
        }
    }
    registerTab(key,Instance){
        this.itemsDict[key] = Instance;
    }

    unRegisterTab(key){
        delete this.itemsDict[key];
    }

    renderIndicator(){
        console.log("sss");
        this._clearTimeout();
        this.renderIndicatorTimeout = window.setTimeout(()=>{
            this._renderIndicator();
        },80);
    }
    _renderIndicator(){
        console.log("_realrenderindicator");
        console.log(this.itemsDict);
    }
    itemClick(data,tabItem){
        if(this.props.onChange){
            this.props.onChange(data,{
                tabsInstance:this,
                tabItemInstance:tabItem
            });
        }
    }
    render(){
        const data = this.props.data||[];
        const outp = {};
        const selectedItemClassName = this.props.selectedItemClassName || `xz-tabs-item-selected xz-tabs-item-selected-${this.props.classType||'1'}`;
        const tabs = [];
        for(let i=0,j=data.length;i<j;i+=1){
            const itemdata = data[i];
            const p = {};
            if(itemdata.key === this.state.selectedKey){
                p.className = selectedItemClassName;
            }
            tabs.push(<TabsItem {...p} key={itemdata.key} {...this.props} tabs={this} data={itemdata}/>);
        }
        outp.className = `xz-tabs xz-tabs-${Theme.getConfig('size',this.props)} xz-tabs-hor`;
        if(this.props.style){
            outp.style = this.props.style;
        }
        return (<div {...outp}>
            <div className='xz-tabs-inner'>
                {tabs}
                <div className='xz-tabs-indicator' />
            </div>
        </div>)
    }
}

@observer
class TabsItem extends React.Component{
    itemClick(data){
        this.props.tabs.itemClick(data,this);
    }
    componentDidMount(){
        this.props.tabs.registerTab(this.props.data.key,this);
        this.props.tabs.renderIndicator();
    }
    componentWillUnmount(){
        this.props.tabs.unRegisterTab(this.props.data.key);
    }
    render(){
        const { data } = this.props;
        const p = {};
        const className = ['xz-tabs-item',`xz-tabs-item-${this.props.classType||'1'}`];
        if(this.props.className){
            className.push(this.props.className);
        }
        if(data.disabled === true || data.disabled === 'disabled'){
            className.push("xz-tabs-item-disabled");
        }else{
            p.onClick = this.itemClick.bind(this,data);
        }

        p.className = className.join(' ');
        return (<div {...p}>{data.label||''}</div>)
    }
}

Tabs.Container = Container;
