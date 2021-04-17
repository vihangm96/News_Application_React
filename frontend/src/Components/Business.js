import React from "react"
import NewsCards from "./NewsCards"
import MyLoader from './MyLoader'
import ReactTooltip from 'react-tooltip'

class Business extends React.Component{

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

      var url = (this.props.isSourceNYTimes) ? "http://localhost:8081/getNYTimesBusiness" :
       "http://a80x-env.eba-pr2qk5uf.us-east-1.elasticbeanstalk.com/getGuardianBusiness";

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

export default Business