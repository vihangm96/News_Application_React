import React from "react"
import Home from './Home'
import Business from './Business'
import Politics from './Politics'
import Sports from './Sports'
import Technology from './Technology'
import World from './World'
import Error from './Error'
import ExpandedCard from './ExpandedCard'
import { Route, Switch, withRouter} from 'react-router-dom';
import Bookmarks from './Bookmarks'
import SearchResults from './SearchResults'
import ReactTooltip from "react-tooltip"


class Content extends React.Component{
    
    componentDidMount(){
        //console.log('say hi')
        ReactTooltip.rebuild()
    }

    render(){
        ReactTooltip.rebuild()
        
        //console.log("Content isSrcNYT props: ",this.props.isSourceNYTimes);
        // console.log("Content Render")
        var path = this.props.location.pathname 
        if(this.props.showExpandedView && !(path === "/ExpandedView") ){
            this.props.setShowExpandedView(false);
            this.props.history.push(`ExpandedView`);
        }

        return(
        <div id="content">
            <Switch>                

                <Route path='/' exact render={() => {
                                             return <Home 
                                                        setExpandedInfo={this.props.setExpandedInfo} 
                                                        isSourceNYTimes={ this.props.isSourceNYTimes} 
                                                        setShowExpandedView={this.props.setShowExpandedView} 
                                                        showExpandedView={this.props.showExpandedView} 
                                                    />} 
                                            }
                />

                <Route path='/ExpandedView' exact render={() => {
                                             return  <ExpandedCard 
                                                        expKey={this.props.expKey} 
                                                        expSrc={this.props.expSrc}
                                                    />} 
                                            }
                />

                <Route path='/Business' exact render={() => {
                                             return <Business 
                                                        setExpandedInfo={this.props.setExpandedInfo} 
                                                        isSourceNYTimes={ this.props.isSourceNYTimes} 
                                                        setShowExpandedView={this.props.setShowExpandedView} 
                                                        showExpandedView={this.props.showExpandedView} 
                                                    />} 
                                            }
                />

                <Route path='/Politics' exact render={() => {
                                             return <Politics 
                                                        setExpandedInfo={this.props.setExpandedInfo} 
                                                        isSourceNYTimes={ this.props.isSourceNYTimes} 
                                                        setShowExpandedView={this.props.setShowExpandedView} 
                                                        showExpandedView={this.props.showExpandedView} 
                                                    />} 
                                            }
                />

                <Route path='/Sports' exact render={() => {
                                             return <Sports 
                                                        setExpandedInfo={this.props.setExpandedInfo} 
                                                        isSourceNYTimes={ this.props.isSourceNYTimes} 
                                                        setShowExpandedView={this.props.setShowExpandedView} 
                                                        showExpandedView={this.props.showExpandedView} 
                                                    />} 
                                            }
                />

                <Route path='/Technology' exact render={() => {
                                             return <Technology 
                                                        setExpandedInfo={this.props.setExpandedInfo} 
                                                        isSourceNYTimes={ this.props.isSourceNYTimes} 
                                                        setShowExpandedView={this.props.setShowExpandedView} 
                                                        showExpandedView={this.props.showExpandedView} 
                                                    />} 
                                            }
                />                                                
                
                <Route path='/World' render={() => { 
                                            return <World 
                                                        setExpandedInfo={this.props.setExpandedInfo} 
                                                        isSourceNYTimes={ this.props.isSourceNYTimes} 
                                                        setShowExpandedView={this.props.setShowExpandedView} 
                                                        showExpandedView={this.props.showExpandedView} 
                                                    />} 
                                            }
                />
                
                <Route path='/bookmarks' render={() => { return <Bookmarks 
                                                        setShowExpandedView={this.props.setShowExpandedView} 
                                                        showExpandedView={this.props.showExpandedView}      
                                                        setExpandedInfo={this.props.setExpandedInfo}       
                                                        
                                                        showBookmarksView={this.props.showBookmarksView}
                                                        setShowBookmarksViewHandler={this.props.setShowBookmarksViewHandler} 
                                                                /> 
                                                        }
                                                } 
                />

                <Route path='/search' render={() => {
                                              return <SearchResults
                                                        isSourceNYTimes={ this.props.isSourceNYTimes} 
                                                        
                                                        setShowExpandedView={this.props.setShowExpandedView} 
                                                        showExpandedView={this.props.showExpandedView} 
                                                        setExpandedInfo={this.props.setExpandedInfo} 
                                                    />}
                                             } 
                />

                <Route component={Error} />
            </Switch>
        </div>
        );
    }
}

export default withRouter(Content)