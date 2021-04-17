import React from "react"
import Card from 'react-bootstrap/Card'
import { IoMdShare } from 'react-icons/io';
import {MdDelete} from 'react-icons/md';
import MyShareModal from './MyShareModal';
import Badge from 'react-bootstrap/Badge'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'

class SummaryCard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            show : false
        }
    }

    share = (event) => {
        console.log('share in summarycard');
        this.setState({show : true})
        event.stopPropagation();
    }

    deleteBookmark = (event) => {
        console.log('deleting bookmark, sc');
        toast('Removing '+this.props.info['title'])
        this.props.deleteHandler(this.props.expKey);
        event.stopPropagation();        
    }

    render(){
        var expKey = this.props.expKey;
        
        var info = this.props.info;
        var expSrc = info['source']
        //var isSourceNYT = this.props.isSourceNYT;
        var isBookmarkCard = this.props.isBookmarkCard;
        var section = info['section'].toUpperCase();;
        var source = info['source'].toUpperCase();;
        //console.log(section)

        var sectionBgColorDict = {
            "WORLD": "#7c4eff",
            "POLITICS": "#419488",
            "BUSINESS": "#4696ec",
            "TECHNOLOGY": "#cedc39",
            "SPORT": "#f6c244",
            "SPORTS": "#f6c244",
            "HEALTH": "#6e757c",
            "GUARDIAN": "#14284a",
            "NYTIMES" : "#dddddd"
        }
        
        var sectionFontColorDict = {
            "SPORT": "black",
            "SPORTS": "black",
            "TECHNOLOGY": "black",
            "NYTIMES": "black"
        }

        var sectionBgColor = (sectionBgColorDict[section]) ? (sectionBgColorDict[section]) : "#6e757c";
        var sectionFontColor = (sectionFontColorDict[section]) ? (sectionFontColorDict[section]) : "white";        

        var sourceBgColor = (sectionBgColorDict[source]) ? (sectionBgColorDict[source]) : "#6e757c";
        var sourceFontColor = (sectionFontColorDict[source]) ? (sectionFontColorDict[source]) : "white";   

        var words = this.props.info['title'].split(' ')
    
        if(words.length > 10){
            var customTitle = ''
            for(var i=0;i<10;i++){
                customTitle += words[i] + ' '
            }
            customTitle += '...'
            }
        else{
            var customTitle = this.props.info['title']
            }

        return ( 
            <>
            
            <MyShareModal
                    show={this.state.show}
                    onHide={() => this.setState({show:false})}
                    title = {info['title']}
                    shareURL = {info['shareURL']}
                    isFromSummaryCard = {true}
                    source = {info['source']}
            />

            <Card 
                  style={{alignItems:'flex-start'}}
                  onClick={() => this.props.handleExpandCard(expKey,expSrc)} 
                  className = 'searchcard shadow bg-white rounded'
            >
                <Card.Body>
                
                    <Card.Title>
                        <span  style={{fontStyle : 'italic', fontWeight : 'bold'}}>
                            {customTitle}
                            < IoMdShare onClick={this.share} />
                            {(isBookmarkCard) ? <MdDelete onClick={this.deleteBookmark} /> : "" } 
                        </span>
                    </Card.Title>
                    <Card.Img variant="top" src={info['image']} className="img-thumbnail" />

					<Card.Text className = "mt-2" style={{display:'flex', flexDirection : 'row',alignItems : 'flex-start'}}>
				      	<h5 className="m-0" style={{marginTop:"2rem"}}>
					    	<span style={{fontStyle: 'italic', fontSize : 'medium'}}>{info['date']}</span>
					    </h5>
					    <div style={{display:'flex', flex:'1', flexDirection: 'row-reverse', alignItems:'flex-end'}}>
					    	
			           		<h5 className="m-0 ml-1" style={{marginTop:"2rem"}}>
			           		{
                                (isBookmarkCard) ? 

                                <Badge className="text-uppercase" 
                                style={{backgroundColor:sourceBgColor,
                                        fontSize:"small", 
                                        color:sourceFontColor
                                       }}> 
                                    {source}
                                </Badge>                    
                                : "" 
			           		}
			           		</h5>
			           		<h5 className="m-0" style={{marginTop:"2rem"}}>
                                <Badge className="text-uppercase" 
                                style={{backgroundColor:sectionBgColor,
                                        fontSize:"small", 
                                        color:sectionFontColor
                                      }}> 
                                            {section}
                                </Badge>{' '}
			           		</h5>
			           	</div>
					</Card.Text>
                </Card.Body>
            </Card>
            </>
        )
    }

}

export default SummaryCard