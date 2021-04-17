import {TwitterIcon,  TwitterShareButton} from "react-share"
import React from 'react'

function MyTwitterShare(props){
    return(
        <>
            <TwitterShareButton url={props.url} hashtags={["CSCI_571_NewsApp"]}>
                <TwitterIcon size={props.size} data-tip={(props.datatip) ? props.datatip : ""} round />
            </TwitterShareButton>
        </>
    );
}

export default MyTwitterShare