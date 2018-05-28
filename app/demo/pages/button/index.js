import {React,PageView,observer,PageContainer,XZ} from "react-bricks"



@PageView()
class BottomDemo extends React.PureComponent {

  componentDidMount() {
  }

  constructor(props){
    super(props);
  }

  goBack(){
    this.props.navigation.goBack();
  }


  onPageBeforeLeave(params){
    if(params.action==="后退"){
      return true;
    }
  }


  render() {
    return <div>BottomDemo
      <button onClick={()=>{
        XZ.go();
      }}>log</button>
    </div>
  }
}

export default BottomDemo;