import React from "react"
import BounceLoader from "react-spinners/BounceLoader";

class MyLoader extends React.Component{
    
    //return (<><Spinner animation="grow" variant="info" style ={{color:'#385dce', verticalAlign:"middle"}}/></>)
    render(){
      return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection:'column', height:'80vh' , width:'100vw'}}>
               <BounceLoader
                 size={30}
                 color={"#2e4ec3"}
        />
               <span className="m-1"><h5>Loading</h5></span>
        </div>
        
        )
    }
}

export default MyLoader