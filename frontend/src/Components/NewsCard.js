import React from "react"
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Badge from 'react-bootstrap/Badge'
import LinesEllipsis from 'react-lines-ellipsis'
import { IoMdShare } from 'react-icons/io';
import MyShareModal from './MyShareModal';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

class NewsCard extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            show : false,
            sectionBgColorDict : {
                "WORLD": "#7c4eff",
                "POLITICS": "#419488",
                "BUSINESS": "#4696ec",
                "TECHNOLOGY": "#cedc39",
                "SPORT": "#f6c244",
                "SPORTS": "#f6c244",
                "HEALTH": "#6e757c",
                "GUARDIAN": "#14284a",
                "NYTIMES" : "#dddddd"
            },
            sectionFontColorDict : {
                "SPORT": "black",
                "SPORTS": "black",
                "TECHNOLOGY": "black",
                "NYTIMES": "black"
            }
        }
    }

    share = (event) => {
                console.log('share in newscard');
                this.setState({show : true})
                event.stopPropagation();
            }

    render(){

        //console.log(this.props.info) 
            
            var imgSrc = this.props.info.image;   
            var desc = this.props.info.description;          
            var title = this.props.info.title;
            var date = this.props.info.date;
            var section = this.props.info.section.toUpperCase();
            var shareURL = this.props.info.shareURL;
            //console.log(section);
            var sectionBgColor = (this.state.sectionBgColorDict[section]) ? (this.state.sectionBgColorDict[section]) : "#6e757c";
            var sectionFontColor = (this.state.sectionFontColorDict[section]) ? (this.state.sectionFontColorDict[section]) : "white";
                
            return(
                <>              

                <MyShareModal
                        show={this.state.show}
                        onHide={() => this.setState({show:false})}
                        title = {title}
                        shareURL = {shareURL}
                        isFromSummaryCard = {false}
                />

                {/* <Container fluid onClick={() => this.props.handleExpandCard(this.props.expKey, this.props.expSrc)}>
                    <Card className="m-3 mb-4 shadow bg-white rounded newscard" >
                    <Card.Body style={bodyStyle}>
                        <Row>
                            <Col md={3}>
                                <Card.Img className="img-thumbnail" src={imgSrc} style={imageStyle} />
                            </Col>
                            <Col md={9}>
                                
                                    <Row> 
                                        <Col>
                                            <Card.Title className="font-italic text-left font-weight-bold">
                                                    
                                                    {title}< IoMdShare onClick={this.share} />
                                            </Card.Title>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            
                                            <div className="card-text">
                                            <span>
                                                <LinesEllipsis
                                                style = {{whiteSpace : 'pre-wrap'}}
                                                className="text-left"
                                                text={desc}
                                                maxLine='3'
                                                ellipsis='...'
                                                trimRight
                                                basedOn='words'
                                                />
                                            </span>
                                            
                                          
                                            </div>
                                        </Col>
                                    </Row>
                                        <Row><p></p></Row>
                                    <Row>
                                        <Col>
                                            <Card.Text className="float-left font-italic">
                                            {date}
                                            </Card.Text>    
                                        </Col>
                                        <Col>
                                            <Badge className="text-uppercase float-right" 
                                            style={{backgroundColor:sectionBgColor,
                                                    fontWeight:520, 
                                                    fontSize:"0.8rem", 
                                                    color:sectionFontColor, 
                                                    fontFamily:"Arial"}}> 
                                                {section}
                                            </Badge>
                                        </Col>
                                    </Row>
                            </Col>
                        </Row>
                        </Card.Body>
                    </Card>
                </Container> */}

                <Card className = ' newscard  m-4 shadow bg-white rounded' onClick={() => this.props.handleExpandCard(this.props.expKey, this.props.expSrc)}>
				<Container fluid>
				<div className="row row-cols-1">
				<div className = "col-md-5 col-lg-3" style={{padding:'20px'}}>
					<img className = 'img-thumbnail' src = {imgSrc} alt='News_Image'/>
				</div>
				<div className="col-md-7 col-lg-9">
				<Card.Body>				
					<Card.Title style={{fontStyle : 'italic'}}>
						<h3 style={{fontWeight : 'bold'}}>
							{title}< IoMdShare onClick={this.share} />
						</h3>
					</Card.Title>
						<h6>
						<ResponsiveEllipsis
			               text={desc}
			               maxLine='3'
			               ellipsis='...'
			               trimRight
			               basedOn='words'
			               style = {{whiteSpace : 'pre-wrap'}}
			            />
			            </h6>
				    <h5 style={{marginTop:"2rem"}}>
				    	<span style={{fontStyle: 'italic'}}>{date}</span>
                           <Badge className="text-uppercase float-right" 
                                            style={{backgroundColor:sectionBgColor,
                                                    fontWeight:520, 
                                                    fontSize:"85%", 
                                                    float:"right",
                                                    color:sectionFontColor, 
                                                    fontFamily:"Arial"}}> 
                                                {section}
                            </Badge>
		           	</h5>
		        </Card.Body>
				</div>
				</div>
				</Container>
			</Card>

                </>
            );
    }
}

export default NewsCard