import React from "react"
import SummaryCards from "./SummaryCards"
import MyLoader from './MyLoader'
import ReactTooltip from 'react-tooltip'

class SearchResults extends React.Component{

    constructor(props){
        super(props);
        //this.props.setShowExpandedView(false)
        this.state = {
            isLoaded : false
            }
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount(){
        var myQuery = (window.location.search).split('=')[1]
        this.setState({
            query:myQuery
        },
        () => {
          console.log(this.state.query)
          this.fetchData()
        })
    }

    componentDidUpdate(){
        var myQuery = (window.location.search).split('=')[1]
        if (this.state.query !== myQuery) {
        this.setState(
          {
              query:myQuery
          },
          () => {
            console.log(this.state.query)
            this.fetchData()
          }
        )
        }
    } 

    fetchData(){

        console.log('in search res fd ')

        var url = (this.props.isSourceNYTimes) ?
                                     "http://localhost:8081/searchNYTimes?searchQuery="+this.state.query : 
                                     "http://localhost:8081/searchGuardian?searchQuery="+this.state.query;
        //console.log("URL is - ",url);

          fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                searchCardsInfo: result
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

    render(){

      ReactTooltip.rebuild()

        if(this.state.isLoaded){
            console.log('sres - sci - ',this.state.searchCardsInfo)
            return(
              <>

              <div className="m-3">
                    <div >
                    <h3>Results</h3>
                    </div>
                    <div >
                    <SummaryCards 
                                  isBookmarkCard = {false}
                                  searchCardsInfo={this.state.searchCardsInfo} 
                                  isSourceNYTimes = {this.props.isSourceNYTimes}
                                  setShowExpandedView={this.props.setShowExpandedView} 
                                  showExpandedView={this.props.showExpandedView} 
                                  setExpandedInfo={this.props.setExpandedInfo} 
                                  // setExpandedInfo={this.props.setExpandedInfo} 
                                  // setShowExpandedView={this.props.setShowExpandedView} 
                                  // showExpandedView={this.props.showExpandedView}  
                            />
                    </div>
                    </div> 
              </>
          );
          }

        //   return (<><Spinner animation="grow" variant="info" style ={{color:'#385dce', verticalAlign:"middle"}}/></>);
        // return (<>fuckin lodin</>);
        return(< MyLoader />)
    }

}

export default SearchResults