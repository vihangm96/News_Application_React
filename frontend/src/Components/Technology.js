import React from "react"
import NewsCards from "./NewsCards"
import MyLoader from './MyLoader'
import ReactTooltip from 'react-tooltip'

class Technology extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          isLoaded : false
          }
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidUpdate(prevProps){
      if (this.props.isSourceNYTimes !== prevProps.isSourceNYTimes) {
        this.setState({isLoaded:false});
        this.fetchData();
      }
    } 

    fetchData(){

      var url = (this.props.isSourceNYTimes) ? "http://localhost:8081/getNYTimesTechnology" : "http://localhost:8081/getGuardianTechnology";

        fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              newsCardsInfo: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
    
    componentDidMount() {
        this.fetchData();
      }

    render(){
      ReactTooltip.rebuild()
        if(this.state.isLoaded){
          return(
            <>
            <NewsCards 
                  newsCardsInfo={this.state.newsCardsInfo} 
                  setExpandedInfo={this.props.setExpandedInfo} 
                  setShowExpandedView={this.props.setShowExpandedView} 
                  />
            </>
        );
        }
        return (<MyLoader />);

    }
}

export default Technology