import {FacebookIcon,  FacebookShareButton} from "react-share"
import React from 'react'

function MyFacebookShare(props){

    return(
        <>
            <FacebookShareButton url={props.url} hashtag="#CSCI_571_NewsApp">
                <FacebookIcon size={props.size} data-tip={(props.datatip) ? props.datatip : ""} round />
            </FacebookShareButton>
        </>
    );
}

export default MyFacebookShare