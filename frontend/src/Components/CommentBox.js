// import React from 'react';
// import commentBox from 'commentbox.io';

// class CommentBox extends React.Component {

//     componentDidMount() {
//         var projectId = "5756376743673856-proj"
//         this.removeCommentBox = commentBox(projectId);
//     }

//     componentWillUnmount() {
//         this.removeCommentBox();
//     }

//     render() {
//         return (
//             <div className="commentbox" id={this.props.id}/>
//         );
//     }
// }

// export default CommentBox

import React from 'react';
import commentBox from 'commentbox.io'
import {withRouter} from "react-router-dom";

class CommentBox extends React.Component {
   componentDidMount() {
        const id = this.props.id
        // console.log(id)
        this.removeCommentBox = commentBox('5756376743673856-proj', {
                createBoxUrl(boxId, pageLocation) {
                    pageLocation.search = id // removes query string!
                    pageLocation.hash = boxId;
                    // console.log(pageLocation.search)
                    return id
                }
        });

   }
  
   componentWillUnmount() {

       this.removeCommentBox();
   }

   render() {
       return (
           <div className="commentbox"/>
       );
   }
}

export default withRouter(CommentBox)