import {React,PageView,Menu,PopView,Input,FormItem,FormRepeat} from "react-bricks"
import './index.less';
import HomeStore from './store'
import {observer} from "mobx-react";

@PageView
class HomeScreen extends React.Component {

  static connectStore(){
    return {homestore:new HomeStore}
  }
  componentDidMount() {
  }
  constructor(props){
    super(props);
    this.seed= 1;
    this.menudata = [

    ];
  }

  goBack(){
    this.props.navigation.goBack();
  }

  go(){
    console.log(this.props.homestore);
    // this.props.navigation.navigate("buttonDemo/nest",{test:'Lucy'});
  }

  onPageBeforeLeave(params){
    if(params.action==="后退"){
      return false;
    }
    return true;
  }

  test(context){
    context.hide();
  }

  renderPopView(context){
    return <div style={{height:200,width:100,backgroundColor:'red'}}><span style={{color:'green'}}>Pop Everything</span><button onClick={this.test.bind(this,context)}>Click</button></div>
  }

  render() {
    return (
      <div>
        <div style={{height:60,width:'100%'}}></div>
        <div>
          <div style={{width:120,height:'100%',float:'left'}}>
          <Menu data={this.menudata}/>
          </div>
          <div style={{marginLeft:120}}>
            <PopView style={{display:'inline-block'}} mode='click' mouseLeaveHide={true} renderContent={this.renderPopView.bind(this)}><button>click</button></PopView>
            <PopView style={{display:'inline-block'}} mode='hover' mouseLeaveHide={true} renderContent={this.renderPopView.bind(this)}><button>hover</button></PopView>
            <button onClick={this.go.bind(this)}>Go</button>
            <FormItem dataKey='inputValue' com={Input} store={this.props.homestore} />
            <FormRepeat dataKey='Lists' store={this.props.homestore} renderRow={(rowdata,index)=>{
              return (
                <div key={index}>
                  <div>
                    <FormItem dataKey='name' store={rowdata} com={Input}/>
                  </div>
                  <div>
                    <FormItem dataKey='name1' store={rowdata} com={Input}/>
                  </div>
                </div>
              );
            }} />

          </div>
        </div>
      </div>
    );
  }
}

export default HomeScreen;