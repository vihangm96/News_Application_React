import React from "react"
import Switch from "react-switch";
 
class SourceSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: !(props.isSourceNYTimes) };
    this.handleChange = this.handleChange.bind(this);
  }
   
  handleChange(checked) {
    this.setState({ checked });
    this.props.toggleSourceHandler();
  }
 
  render() {
    return (
      <label>
        <Switch onChange={this.handleChange} checked={this.state.checked} uncheckedIcon={false} checkedIcon={false} offColor={"#dddddd"} onColor={"#4696ec"}/>
      </label>
    );
  }
}

// class SourceSwitch extends React.Component{

//     constructor(){
//         super();
//         this.state = { checked: false };
//         this.handleChange = this.handleChange.bind(this);        
//     }

//     handleChange(checked) {
//         this.setState({ checked });
//     }

//     render(){
//         //console.log("Inside Switch");
//         return(
//         <Form>
//             <Form.Check 
//                 type="switch"
//                 id="source-switch"
//                 label=""
//             />
//         </Form>
//         );
//     }

// }

export default SourceSwitch