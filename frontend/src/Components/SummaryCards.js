import SummaryCard from "./SummaryCard"
import React from "react"
import './style.css'

class SummaryCards extends React.Component{

    constructor(props){
        // console.log('constr - scs')
        super(props);
        this.handleExpandCard = this.handleExpandCard.bind(this)
    }

    handleExpandCard(expKey,expSrc){
        // console.log("in summary card, Key from handleclick ",expKey);
        this.props.setShowExpandedView(true);
        this.props.setExpandedInfo(expKey,expSrc)

        if (this.props.showBookmarksView) {
            this.props.setShowBookmarksViewHandler(false);
        }
    } 


     render(){
        
        if(this.props.isBookmarkCard){
            console.log('render bkms - scs')
            var isBookmarkCard = this.props.isBookmarkCard
            var deleteHandler = this.props.deleteHandler
            var bookmarks = JSON.parse(window.localStorage.bookmarkedArticles)
            var handleExpandCard = this.handleExpandCard
            var cardComponents = Object.keys(bookmarks)
                                        .map(function(summaryCardKey) {
                                        var summaryCard = JSON.parse(window.localStorage.bookmarkedArticles)[summaryCardKey]
                                        //console.log(summaryCard)
                                         return <SummaryCard 
                                                     key={summaryCardKey}
                                                     expKey={summaryCardKey}
                                                     info={summaryCard['info']}
                                                     isSourceNYTimes={summaryCard['isSourceNYTimes']}
                                                     isBookmarkCard = {isBookmarkCard}
                                                     deleteHandler = {deleteHandler}
                                                     handleExpandCard={handleExpandCard} 
                                                 />
                                        })
        }
        else{
            //console.log('render searchres - scs')
            var isBookmarkCard = this.props.isBookmarkCard
            var handleExpandCard = this.handleExpandCard
            var cardComponents = this.props.searchCardsInfo.map(article => 
                                                <SummaryCard 
                                                    key={article.id} 
                                                    expKey={article.id}  
                                                    info={article} 
                                                    isSourceNYTimes={this.props.isSourceNYTimes}
                                                    isBookmarkCard = {isBookmarkCard}
                                                    handleExpandCard={handleExpandCard}  
                                                />)
        }

        return(
            <>
                <div className="grid"> 
                    {cardComponents}
				</div>
            </>
        );
    }
}

export default SummaryCards