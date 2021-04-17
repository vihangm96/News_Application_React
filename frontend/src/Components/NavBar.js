import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import SourceSwitch from './SourceSwitch'
import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
// import './NavBar.css'
import MySearch from './MySearch'
import ReactTooltip from 'react-tooltip'

class NavBar extends React.Component{

    constructor(props){
        super(props);
        this.handleSectionClick = this.handleSectionClick.bind(this)
        this.handleBookmarksClick = this.handleBookmarksClick.bind(this)
        this.handleSearchClick = this.handleSearchClick.bind(this)

        this.state = {selectedTab:"home"}
		this.tabClick = this.tabClick.bind(this)
    }

    componentDidMount(){
        ReactTooltip.rebuild()
    }

	tabClick(e){

		var id = e.currentTarget.dataset.id
		this.setState((prevState)=>{
			return {selectedTab:id}
        })
        ReactTooltip.rebuild()
        this.handleSectionClick();
	}

    handleSearchClick(){
        ReactTooltip.rebuild()
        this.props.setShowSearchViewHandler(true);
        this.props.setShowExpandedView(false);
        this.props.setShowBookmarksViewHandler(false);
    }

    handleSectionClick(){
        if (this.props.showExpandedView) {
            this.props.setShowExpandedView(false);
          }
        if (this.props.showBookmarksView) {
            this.props.setShowBookmarksViewHandler(false);
        }    
        if (this.props.showSearchView) {
            this.props.setShowSearchViewHandler(false);
        }  
        // console.log('navbar clicked') 
        // console.log('this.props.showExp - ',this.props.showExpandedView)
        ReactTooltip.rebuild()
    }

    handleBookmarksClick(){
        ReactTooltip.rebuild()
        //this.props.toggleShowBookmarksView();
        this.props.setShowBookmarksViewHandler(true);
        this.props.setShowExpandedView(false);
    }

    render(){
        ReactTooltip.rebuild()
        
		var loc = this.props.location.pathname
		if(this.state.selectedTab!=="" && (loc==="/bookmarks" || loc==="/search" || loc==="/ExpandedView")){
			this.setState({selectedTab:""})
		}

        return(
            <>
            <ReactTooltip place='bottom' effect="solid" type="dark" />
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" style={{backgroundImage: "linear-gradient(to right, #24355c , #4060a5)", width: "100%", verticalAlign: 'middle'}}>
            <MySearch style={{'max-width':'250rem','min-width': '250rem' }} onSearchHandler={this.handleSearchClick} />
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">

                    <Nav className="mr-auto"> 

					<Nav.Link as={Link} data-id="home" className = {this.state.selectedTab==="home"? "selected":null} to="/" onClick={this.tabClick}>Home</Nav.Link>
					<Nav.Link as={Link} data-id="world" className = {this.state.selectedTab==="world"? "selected":null} to="/World" onClick={this.tabClick}>World</Nav.Link>
					<Nav.Link as={Link} data-id="politics" className = {this.state.selectedTab==="politics"? "selected":null} to="/Politics" onClick={this.tabClick}>Politics</Nav.Link>
					<Nav.Link as={Link} data-id="business" className = {this.state.selectedTab==="business"? "selected":null} to="/Business" onClick={this.tabClick}>Business</Nav.Link>
					<Nav.Link as={Link} data-id="technology" className = {this.state.selectedTab==="technology"? "selected":null} to="/Technology" onClick={this.tabClick}>Technology</Nav.Link>
					<Nav.Link as={Link} data-id="sports" className = {this.state.selectedTab==="sports"? "selected":null} to="/Sports" onClick={this.tabClick}>Sports</Nav.Link>

                    {/* <Nav.Link as={Link} to="/" onClick={this.handleSectionClick}>Home</Nav.Link>
                    <Nav.Link as={Link} to="/World" onClick={this.handleSectionClick}>World</Nav.Link>
                    <Nav.Link as={Link} to="/Politics" onClick={this.handleSectionClick}>Politics</Nav.Link>
                    <Nav.Link as={Link} to="/Business" onClick={this.handleSectionClick}>Business</Nav.Link>
                    <Nav.Link as={Link} to="/Technology" onClick={this.handleSectionClick}>Technology</Nav.Link>
                    <Nav.Link as={Link} to="/Sports" onClick={this.handleSectionClick}>Sports</Nav.Link> */}
                    
                    </Nav>
            </Nav>

            <Nav>
            {
            this.props.showBookmarksView ? 
            <Nav.Link as={Link} to="/bookmarks" className='mr-2' onClick={this.handleBookmarksClick}><FaBookmark data-tip="Bookmark" style={{fontSize : 'large',color:"#f8f9fa"}} /></Nav.Link> :
            <Nav.Link as={Link} to="/bookmarks" className='mr-2' onClick={this.handleBookmarksClick}><FaRegBookmark data-tip="Bookmark" style={{fontSize : 'large',color:"#f8f9fa"}} /></Nav.Link>
            }
            
            { (this.props.showExpandedView || this.props.showBookmarksView || this.props.showSearchView || (this.props.location.pathname === "/ExpandedView") ) ? "" : 
            <>
            <Navbar.Text className="switch-label mr-2" style={{fontSize : 'large', color:"#f8f9fa"}}> NYTimes </Navbar.Text>
            <Navbar.Text className='mr-2' style={{fontSize : 'large'}}>
                <SourceSwitch toggleSourceHandler={this.props.toggleSourceHandler} 
                          isSourceNYTimes={this.props.isSourceNYTimes} />
            </Navbar.Text>
            <Navbar.Text className="switch-label mr-2" style={{fontSize : 'large', color:"#f8f9fa"}}> Guardian </Navbar.Text>                
            </>
            }
            </Nav>

            </Navbar.Collapse>
            </Navbar>
            </>
        );
    }
}

export default withRouter(NavBar)