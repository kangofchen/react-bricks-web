import {React,PageView,Menu,PopView,Input,Form,Select} from "react-bricks"
import './index.less';
import HomeStore from './store'
import {observer} from "mobx-react";

const FormRepeat = Form.FormRepeat;
const FormItem = Form.FormItem;




const menudata = [
  {
  icon:'',
  label:'关于',
  key:'xxxxx',
},
{
  label:'快速上手',
  key:'xxxxx',
},
{
  label:"组件",
  key:"xxxxxxxx",
  children:[
      {label:"Button",key:'xxxxxxx'},
      {label:"Menu",key:'xxxxxxx',children:[
          {label:'2.2.1',key:'xxxxxxxx'},
          {label:'2.2.2',key:'xxxxxxxx'}
      ]},
  ]
},
{
  label:'生命周期',
  key:'xxxxx',
},
{
  label:'数据状态',
  key:'frfrf',children:[
      {label:"4.1",key:'xxxxxxx'},
      {label:"4.2",key:'xxxxxxx',children:[
          {label:'4.2.1',key:'xxxxxxxx'},
          {label:'4.2.2',key:'xxxxxxxx'}
      ]},
  ]
},{
  label:'打包发布',
  key:'xxxxx',
},

];

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
          <div style={{width:140,height:'100%',float:'left'}}>
          <Menu data={menudata}/>
          </div>
          <div style={{marginLeft:120}}>
            <PopView style={{display:'inline-block'}} mode='click' mouseLeaveHide={true} renderContent={this.renderPopView.bind(this)}><button>click</button></PopView>
            <PopView style={{display:'inline-block'}} mode='hover' mouseLeaveHide={true} renderContent={this.renderPopView.bind(this)}><button>hover</button></PopView>
            <button onClick={this.go.bind(this)}>Go</button>
            <Form store={this.props.homestore} renderContent={(formProps)=>{
              return (
                <div>
                  <FormItem rule={[
                    {message:'必填!',regex:'required'},
                    {message:'小于10',regex:(val)=>{
                      if(val>10){
                        return false;
                      }
                      return true;
                    }}
                  ]} {...formProps} dataKey='selectorValue' com={Select}  />
                  <FormItem {...formProps} rule={[]} dataKey='inputValue' com={Input}  />
                  <FormRepeat {...formProps} dataKey='Lists' renderRow={(rowProps)=>{
                    return (
                      <div>
                          <FormItem {...rowProps} dataKey='name' label={"姓名"} com={Input}/>
                          <FormItem {...rowProps} dataKey='name1' com={Input}/>
                      </div>
                    );
                  }} />
                </div>);
            }}/>
            

          </div>
        </div>
      </div>
    );
  }
}

export default HomeScreen;