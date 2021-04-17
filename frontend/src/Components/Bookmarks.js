import React from "react"
import SummaryCards from "./SummaryCards"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Zoom } from 'react-toastify'
import ReactTooltip from 'react-tooltip'

class Bookmarks extends React.Component{
    constructor(props){
        super(props);
        var count = Object.keys(JSON.parse(localStorage.bookmarkedArticles)).length;
        this.state = {
            bookmarksCount : count
        }
    }

    componentDidMount(){
        ReactTooltip.hide()

    }

    handleDelete = (id) => {

        console.log('in bkms hd')

        var bookmarkedArticles = JSON.parse(localStorage.getItem("bookmarkedArticles"));
        delete bookmarkedArticles[id]        
        localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarkedArticles))

        this.setState({
            bookmarksCount : Object.keys(JSON.parse(localStorage.bookmarkedArticles)).length
        })
    }
    
    render(){
        ReactTooltip.rebuild()

        if( window.localStorage.bookmarkedArticles.length === 2 ){
            return(
                <>
                <div className="m-3" style={{textAlign : 'center'}}>
                <ToastContainer transition={Zoom} position = {'top-center'} autoClose= {1500} hideProgressBar={true} closeOnClick={true} pauseOnHover={true} draggable={true} />
                <h3> You have no saved articles </h3> 
                </div>
                </> 
            )            
        }

        return(
            <div className="m-3 ">
            <ToastContainer transition={Zoom} position = {'top-center'} autoClose= {1500} hideProgressBar={true} closeOnClick={true} pauseOnHover={true} draggable={true} />
            <div >
            <h3>Favorites</h3>
            </div>
            <div >
            <SummaryCards isBookmarkCard = {true}  
                          deleteHandler = {this.handleDelete}
                          bookmarksCount = {this.state.bookmarksCount}

                          setShowExpandedView={this.props.setShowExpandedView} 
                          showExpandedView={this.props.showExpandedView} 
                          setExpandedInfo={this.props.setExpandedInfo} 

                          showBookmarksView={this.props.showBookmarksView}
                          setShowBookmarksViewHandler={this.props.setShowBookmarksViewHandler} 
            />
            </div>
            </div> 
        )
    }
}

export default Bookmarks