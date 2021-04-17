import React from 'react';
// import './style.css' 
import NavBar from './Components/NavBar'
import Content from './Components/Content'

class App extends React.Component{

  constructor(){
    console.log("from App constr")
    super();
    this.toggleSource = this.toggleSource.bind(this);
    
    this.setExpandedInfo = this.setExpandedInfo.bind(this);
    this.setShowExpandedView = this.setShowExpandedView.bind(this);

    this.setShowBookmarksView = this.setShowBookmarksView.bind(this);
    
    this.setShowSearchView = this.setShowSearchView.bind(this);

    // TODO set defult last

    if(window.localStorage.getItem('storedIsSourceNYTimes') != null){
      if(window.localStorage.getItem('storedIsSourceNYTimes') == "true"){
        var storedIsSourceNYTimes = true;
      }
      else{
        var storedIsSourceNYTimes = false;
      }
    }
    else{
      var storedIsSourceNYTimes = true;
      localStorage.setItem('storedIsSourceNYTimes','true' ) 
      console.log("in app constr catch")
    }

    this.state = {isSourceNYTimes : storedIsSourceNYTimes,
                  showExpandedView : false//,
                  //showBookmarksView: false
                 }

    if(window.localStorage.getItem('bookmarkedArticles') == null){
      //var bookmarkedArticles = []
      var bookmarkedArticles = {}
      localStorage.setItem('bookmarkedArticles',JSON.stringify(bookmarkedArticles))
    }
  }

  toggleSource(){
    this.setState( prevState => {
      return {
        isSourceNYTimes : !(prevState.isSourceNYTimes),
      }
    },
    () => {
      if(this.state.isSourceNYTimes){
      localStorage.setItem('storedIsSourceNYTimes','true' )
    }
    else{
      localStorage.setItem('storedIsSourceNYTimes','false' ) 
    } } );
     
  }

  setShowExpandedView(value){
    this.setState({
      showExpandedView : value
    })
  }

  setShowBookmarksView(value){
    this.setState({
      showBookmarksView : value
    })
  }

  setShowSearchView(value){
    this.setState({
      showSearchView : value
    })
  }

  setExpandedInfo(info,src){
    console.log("setting in app.js - "+info, src)
    this.setState({
      expKey : info,
      expSrc : src
    })
  }  

  render(){
    console.log("from App render")
    //console.log(window.localStorage)
    //console.log("FUCK OFF app");
    return(
      <div className="App">
        <NavBar 
                toggleSourceHandler={this.toggleSource}
                isSourceNYTimes={this.state.isSourceNYTimes}
                
                showExpandedView={this.state.showExpandedView}
                setShowExpandedView={this.setShowExpandedView}

                showBookmarksView={this.state.showBookmarksView}
                setShowBookmarksViewHandler={this.setShowBookmarksView}       

                showSearchView={this.state.showSearchView}
                setShowSearchViewHandler={this.setShowSearchView}         
        />

        <Content 
                isSourceNYTimes={this.state.isSourceNYTimes} 
                
                expKey={this.state.expKey} 
                expSrc={this.state.expSrc}
                setExpandedInfo={this.setExpandedInfo} 
                setShowExpandedView={this.setShowExpandedView} 
                showExpandedView={this.state.showExpandedView} 

                showBookmarksView={this.state.showBookmarksView}
                setShowBookmarksViewHandler={this.setShowBookmarksView}     

                //showSearchView={this.state.showSearchView}
        />
      </div>
    );    
  }
}

export default App;