import React from "react"
import Modal from 'react-bootstrap/Modal'
import MyEmailShare from './MyEmailShare';
import MyFacebookShare from './MyFacebookShare';
import MyTwitterShare from './MyTwitterShare';

function MyShareModal(props) {

    if(props.isFromSummaryCard){
        if(props.source === "NYTIMES"){
            var sourceLine = "NEW YORK TIMES"
        }
        else{
            var sourceLine = "GUARDIAN"
        }
    }
    else{
        sourceLine=""
    }

    return (
      <Modal
        {...props}
        //size="lg"
        // aria-labelledby="contained-modal-title-vcenter"
        // centered
      >
        <Modal.Header closeButton>
          
          <Modal.Title>
			          	<h4 style={{fontWeight : 'bold'}}>{sourceLine}</h4>
			          	<h5>{props.title}</h5>
			    </Modal.Title>

        </Modal.Header>
        <Modal.Body style={{display:'flex', flexDirection:'column', alignItems : 'center'}}>
            <h5>Share via</h5>
            <div style={{display:"flex", width:"100%",justifyContent:"space-around"}}>
            <MyTwitterShare size="3.5rem" url={props.shareURL}/>
            <MyFacebookShare size="3.5rem" url={props.shareURL}/>
            <MyEmailShare size="3.5rem" url={props.shareURL}/>   
            </div>             
        </Modal.Body>
      </Modal>
    );
  }

export default MyShareModal