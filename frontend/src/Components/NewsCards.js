import NewsCard from "./NewsCard"
import React from "react"

class NewsCards extends React.Component{

    constructor(props){
        super(props);

        this.handleExpandCard = this.handleExpandCard.bind(this)

        this.state = {
        }
    }

    handleExpandCard(expKey,expSrc){
        console.log("Key from handleclick ",expKey);
        this.props.setShowExpandedView(true);
        this.props.setExpandedInfo(expKey,expSrc);
    }

     render(){

        // if(this.state.isLoading){
        //     return (<h1>Loading...</h1>);
        // }
        // else{
        const articleComponents = this.props.newsCardsInfo.map(article => <NewsCard 
                                                                                key={article.id} 
                                                                                expKey={article.id} 
                                                                                expSrc = {article.source}
                                                                                info={article} 
                                                                                handleExpandCard={this.handleExpandCard} /> )
        return(
            <>
            {articleComponents}
            </>
        );
    //}
    }
}

export default NewsCards