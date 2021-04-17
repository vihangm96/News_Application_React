import {EmailIcon,  EmailShareButton} from "react-share"
import React from 'react'

function MyEmailShare(props){

    return(
        <>
            <EmailShareButton url={props.url} subject="#CSCI_571_NewsApp">
                <EmailIcon size={props.size} data-tip={(props.datatip) ? props.datatip : ""} round />
            </EmailShareButton>
        </>
    );
}

export default MyEmailShare