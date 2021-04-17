import React from "react"
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import CommentBox from './CommentBox'
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'
import { FaBookmark, FaRegBookmark} from 'react-icons/fa';
import MyFacebookShare from './MyFacebookShare'
import MyTwitterShare from './MyTwitterShare'
import MyEmailShare from './MyEmailShare'
import ReactTooltip from 'react-tooltip'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyLoader from './MyLoader'
import { Zoom } from 'react-toastify'
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

class ExpandedCard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            isBookmarked: false,
            isExpanded: false ,
            canExpand: false
        }
        this.handleBookmarkClick = this.handleBookmarkClick.bind(this)
        this.handleExpandClick = this.handleExpandClick.bind(this)
        this.handleCollapseClick = this.handleCollapseClick.bind(this)

        // toast.configure({
        //   autoClose: 2500,
        //   draggable: true,
        //   position : "top-center",
        //   hideProgressBar : true
        //   //etc you get the idea
        // });
    }

    componentDidMount(){
      // toast.configure({
      //   autoClose: 2500,
      //   draggable: true,
      //   position : "top-center",
      //   hideProgressBar : true
      //   //etc you get the idea
      // });

        var url = (this.props.expSrc === "NYTIMES") ? 
            "http://localhost:8081/findNYTimes?articleURL="+this.props.expKey :
            "http://localhost:8081/findGuardian?articleId="+this.props.expKey ;
        console.log("EXP URL is - ",url);
  
          fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
                //console.log("Exp res ", result)
                console.log('checking bookmarked')
                //console.log(result)
                

                var bookmarkedArticles = JSON.parse(localStorage.getItem("bookmarkedArticles"));
                //console.log(bookmarkedArticles)
                var aKey;
                var isBookmarkedStored = false
                for(aKey of Object.keys(JSON.parse(localStorage.bookmarkedArticles))  ){
                  if(aKey === this.props.expKey){
                    isBookmarkedStored = true;
                    break;
                  }
                }


              this.setState({
                isLoaded: true,
                newsCardsInfo: result,
                isBookmarked : isBookmarkedStored
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          ).then(()=>{
            var ellipseText = document.getElementsByClassName("LinesEllipsis")[0].innerHTML.split("<wbr>")[0]
            if (ellipseText !== this.state.newsCardsInfo.desc)
              this.setState({canExpand:true})
            else
              this.setState({canExpand:false})
          })
    }

    handleBookmarkClick(){
      this.setState( prevState => {
        return {
        isBookmarked : !(prevState.isBookmarked),
        } 
      },
      () => {
        if(this.state.isBookmarked){
          console.log('bookmarking article')

          toast("Saving "+this.state.newsCardsInfo.title)

          // <Toast delay={3000} autohide>
          //   <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
          // </Toast>

          var bookmarkedArticles = JSON.parse(localStorage.getItem("bookmarkedArticles"));
          bookmarkedArticles[this.props.expKey] = {'info' : this.state.newsCardsInfo //, 
                                                  // 'isSourceNYTimes' : this.props.isSourceNYTimes ,
                                                  }

          localStorage.setItem('bookmarkedArticles',JSON.stringify(bookmarkedArticles))
          //console.log(localStorage)
      }
      else{
        console.log('removing bookmarked article')

        toast("Removing - "+this.state.newsCardsInfo.title)

        var bookmarkedArticles = JSON.parse(localStorage.getItem("bookmarkedArticles"));
        delete bookmarkedArticles[this.props.expKey]        
        localStorage.setItem('bookmarkedArticles',JSON.stringify(bookmarkedArticles))
        //console.log(localStorage)        
        //localStorage.setItem('storedIsSourceNYTimes','false' ) 
      } } );      
    }

    handleExpandClick(){
      this.setState({
        isExpanded:true
      })
    }

    handleCollapseClick(){
      this.setState({
        isExpanded:false
      })
    }

    render(){
      //console.log('exp state - ', this.state)

        if(this.state.isLoaded){

          
          var commentBoxID = (this.state.newsCardsInfo.source === "NYTIMES") ? (this.state.newsCardsInfo.id).split('://')[1] 
                                                                              : this.state.newsCardsInfo.id 

          var canExpand = this.state.canExpand;
          var desc = this.state.newsCardsInfo.desc

            return(
                    <>
                    {/* <Container fluid style={{width:'96%'}}> */}

                      {/* <ToastContainer position='top-center' autoClose={3000} hideProgressBar={true} draggable={true} /> */}


                    <ReactTooltip place='top' effect="solid" type="dark" data-offset={{top: -10}}/>
                    <Card className = 'm-3 shadow bg-white rounded'>
                    <Card.Body>
                        <Card.Title>
                          <h3 style={{fontStyle : 'italic'}}>  
                            {this.state.newsCardsInfo.title}
                          </h3>
                        </Card.Title>

                        <div style={{display :'flex', flexDirection : 'row', alignItems : 'center'}}> 

                          <h5 style={{margin:'0rem',marginLeft : '1%'}}>
							    	        <span style={{fontStyle: 'italic'}}>{this.state.newsCardsInfo.date}</span>
				           		    </h5>


                           <div style={{display:"flex", flexDirection : 'row-reverse', flex:'1',marginLeft : '2.5%', flexWrap : 'wrap'}}>
				           			   <div  onClick={this.handleBookmarkClick} style={{color:"#b24555", fontSize:"2rem", marginLeft : '5%', marginRight : '1.5%'}}>
                            {this.state.isBookmarked ? 
                                < FaBookmark data-tip="Bookmark"/> : 
                                < FaRegBookmark data-tip="Bookmark"/> } 
		                        </div>
                            <div style={{display:'flex',flex:'1',justifyContent : 'flex-end'}}>

                                    <MyFacebookShare size="2rem" datatip="Facebook" url={this.state.newsCardsInfo.shareURL}/>
                                    <MyTwitterShare size="2rem" datatip="Twitter" url={this.state.newsCardsInfo.shareURL}/>
                                    <MyEmailShare size="2rem" datatip="Email" url={this.state.newsCardsInfo.shareURL}/>

                                    </div>
                                    <ToastContainer transition={Zoom} position = {'top-center'} autoClose= {1500} hideProgressBar={true} closeOnClick={true} pauseOnHover={true} draggable={true} />
                            </div>
                        </div>

                        <Card.Img variant="top" src={this.state.newsCardsInfo.image} />
                        
                        {/* <Card.Text>
                            {
                            (canExpand) ?
                                     ((this.state.isExpanded) ? desc : minDesc) 
                              : desc
                            }
                        </Card.Text> */}

                        <Card.Text>
                              {this.state.isExpanded ?
                                this.state.newsCardsInfo.desc
                                :
                                <ResponsiveEllipsis
                                        text= {desc}
                                        maxLine = {6}
                                        ellipsis="..."
                                        trimRight
                                        basedOn='words'
                                        style = {{whiteSpace : 'pre-wrap'}}
                                      />
                                  }
                        </Card.Text>

                        {
                          (canExpand) ?
                          ((this.state.isExpanded) ? 
                              <MdKeyboardArrowUp onClick={this.handleCollapseClick} style={{fontSize:'1.5rem', float:'right'}} /> : 
                              <MdKeyboardArrowDown onClick={this.handleExpandClick} style={{fontSize:'1.5rem', float:'right'}} />) 
                          : ""
                        }

                    </Card.Body>
                    </Card>
                    
                    <CommentBox id={commentBoxID}  />   
                {/* </Container> */}
                </>
            );
        }

        return(
            <>
            <MyLoader />
            </>
        );
    }
}

export default ExpandedCard