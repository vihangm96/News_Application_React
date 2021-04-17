const express = require('express')
const app = express()
const port = 8081
const fetch = require('node-fetch')

const guardianAPIKey = "ac614c73-ef27-4ef7-8fa9-570cca369921"
const guardianHome = "https://content.guardianapis.com/search?api-key=" + guardianAPIKey + "&section=(sport|business|technology|politics)&show-blocks=all&page-size=20"
const guardianSport = "https://content.guardianapis.com/search?api-key="+ guardianAPIKey +"&section=sport&show-blocks=all&page-size=20"
const guardianBusiness = "https://content.guardianapis.com/search?api-key="+ guardianAPIKey +"&section=business&show-blocks=all&page-size=20"
const guardianPolitics = "https://content.guardianapis.com/search?api-key="+ guardianAPIKey +"&section=politics&show-blocks=all&page-size=20"
const guardianTechnology = "https://content.guardianapis.com/search?api-key="+ guardianAPIKey +"&section=technology&show-blocks=all&page-size=20"
const guardianWorld = "https://content.guardianapis.com/search?api-key="+ guardianAPIKey +"&section=world&show-blocks=all&page-size=20"

const NYTimesAPIKey = "rMaAjS25RDEHRbWQvPF0ctEFwoRXJLAz"
const NYTimesHome = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key="+NYTimesAPIKey
const NYTimesWorld = "https://api.nytimes.com/svc/topstories/v2/"+ "world" +".json?api-key=" + NYTimesAPIKey
const NYTimesPolitics = "https://api.nytimes.com/svc/topstories/v2/"+ "politics" +".json?api-key=" + NYTimesAPIKey
const NYTimesBusiness = "https://api.nytimes.com/svc/topstories/v2/"+ "business" +".json?api-key=" + NYTimesAPIKey
const NYTimesTechnology = "https://api.nytimes.com/svc/topstories/v2/"+ "technology" +".json?api-key=" + NYTimesAPIKey
const NYTimesSports = "https://api.nytimes.com/svc/topstories/v2/"+ "sports" +".json?api-key=" + NYTimesAPIKey

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  

function extractGuardianData(rawData){

    try{
        var imgSrc = ((rawData.blocks.main.elements[0].assets[rawData.blocks.main.elements[0].assets.length-1].file) == "" ?
        "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" :
        rawData.blocks.main.elements[0].assets[rawData.blocks.main.elements[0].assets.length-1].file)
    }catch{
        var imgSrc =  "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
    }
   
    return {
        id : rawData.id,
        title : rawData.webTitle,
        section : rawData.sectionId,
        image : imgSrc, 
        date : rawData.webPublicationDate.substring(0,10),
        desc : rawData.blocks.body[0].bodyTextSummary,
        shareURL : rawData.webUrl,
        source : "GUARDIAN"
    }
}

function extractNYTimesData(rawData){
    
    try{
        var flagFound = false;

        for(var k=0;k<rawData.multimedia.length;k++){
            if(rawData.multimedia[k].width >=2000){
                flagFound = true;
                var imgSrc = rawData.multimedia[k].url
                break
            }
        }

        if(flagFound){
            if(imgSrc.substring(0,6) === "images"){
                imgSrc="https://static01.nyt.com/"+imgSrc;
            }
        }

        if(!flagFound){
            var imgSrc =  "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
        }
    }catch{
        var imgSrc =  "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    }

    return {
        id : rawData.web_url,
        title : rawData.headline.main,
        section : rawData.section_name,
        image : imgSrc, 
        date : rawData.pub_date.substring(0,10),
        desc : rawData.abstract,
        shareURL : rawData.web_url,
        source : "NYTIMES"
    }
}

function cleanSearchNYTimesData(data){
    
    var filteredData = [];
    for(var i=0;i<data.length;i++){

        var rawData = data[i]

        try{
            var flagFound = false;
    
            for(var k=0;k<rawData.multimedia.length;k++){
                if(rawData.multimedia[k].width >=2000){
                    flagFound = true;
                    var imgSrc = rawData.multimedia[k].url
                    break
                }
            }
    
            if(flagFound){
                if(imgSrc.substring(0,6) === "images"){
                    imgSrc="https://www.nytimes.com/"+imgSrc;
                }
            }
    
            if(!flagFound){
                var imgSrc =  "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
            }
        }catch{
            var imgSrc =  "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
        }
    
        var newArticle = {
                            title : rawData.headline.main,
                            image : imgSrc, 
                            section : rawData.news_desk,
                            date : rawData.pub_date.substring(0,10),
                            desc : rawData.abstract,
                            shareURL : rawData.web_url,
                            source : "NYTIMES",
                            id : rawData.web_url
                        }

        filteredData.push(newArticle);
    }

    return filteredData;
}

function cleanGuardianData(data){
    var filteredData = [];
    var count = 0;

    for(var i=0;i<data.length;i++){        

        if(count==10){
            break
        }

        try{
            if(data[i].webTitle == "" || 
               data[i].sectionId == "" || 
               data[i].webPublicationDate == "" || 
               data[i].blocks.body[0].bodyTextSummary == "" || 
               data[i].webUrl == "" ){
                continue
            }
            else{
                try{
                    var imgSrc = data[i].blocks.main.elements[0].assets[data[i].blocks.main.elements[0].assets.length-1].file == "" ?
                    "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" :
                    data[i].blocks.main.elements[0].assets[data[i].blocks.main.elements[0].assets.length-1].file
                }catch{
                    var imgSrc =  "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
                }

                //console.log('here')
                var newArticle = {
                    id: data[i].id,
                    title: data[i].webTitle,
                    image: imgSrc,
                    section: data[i].sectionId.toUpperCase() == "SPORT" ? "SPORTS" : data[i].sectionId.toUpperCase(),
                    date: data[i].webPublicationDate.substring(0,10),
                    description: data[i].blocks.body[0].bodyTextSummary,
                    shareURL: data[i].webUrl,
                    source : "GUARDIAN" 
                };
                
                filteredData.push(newArticle);
                count+=1;
                //console.log("new article",count)
            }
            }
            catch{}
    }
    //console.log(filteredData)
    return filteredData;
}

function cleanNYTimesData(data){
    var filteredData = [];
    var count = 0;

    for(var i=0;i<data.length;i++){        

        if(count==10){
            break
        }

        try{
            if(data[i].title == "" || 
                data[i].section == "" || 
                data[i].published_date == "" || 
                data[i].abstract == "" || 
                data[i].url == "" ){
                continue
            }
            else{
                try{
                    var flagFound = false;

                    for(var k=0;k<data[i].multimedia.length;k++){
                        if(data[i].multimedia[k].width >=2000){
                            flagFound = true;
                            var imgSrc = data[i].multimedia[k].url
                            break
                        }
                    }

                    if(!flagFound){
                        var imgSrc =  "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
                    }
                }catch{
                    var imgSrc =  "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
                }

                //console.log('here')
                var newArticle = {
                    id: data[i].url,
                    title: data[i].title,
                    image: imgSrc,
                    section: data[i].section,
                    date: data[i].published_date.substring(0,10),
                    description: data[i].abstract,
                    shareURL: data[i].url,
                    source : "NYTIMES"
                };
                
                filteredData.push(newArticle);
                count+=1;
                //console.log("new article",count)
            }
            }
            catch{}
    }
    //console.log(filteredData)
    return filteredData;
}

app.get('/getGuardianHome', (req, res, next) => {
    fetch(guardianHome)
    .then(response => response.json())
    .then(data => {
    res.send(cleanGuardianData(data.response.results))
    })
    .catch(err => console.log("Error"))
})

app.get('/getGuardianSport', (req, res, next) => {
    fetch(guardianSport)
    .then(response => response.json())
    .then(data => {
    res.send(cleanGuardianData(data.response.results))
    })
    .catch(err => console.log("Error"))
})

app.get('/getGuardianBusiness', (req, res, next) => {
    fetch(guardianBusiness)
    .then(response => response.json())
    .then(data => {
    res.send(cleanGuardianData(data.response.results))
    })
    .catch(err => console.log("Error"))
})

app.get('/getGuardianPolitics', (req, res, next) => {
    fetch(guardianPolitics)
    .then(response => response.json())
    .then(data => {
    res.send(cleanGuardianData(data.response.results))
    })
    .catch(err => console.log("Error"))
})

app.get('/getGuardianTechnology', (req, res, next) => {
    //console.log(guardianTechnology)
    fetch(guardianTechnology)
    .then(response => response.json())
    .then(data => {
    res.send(cleanGuardianData(data.response.results))
    })
    .catch(err => console.log("Error"))
})

app.get('/getGuardianWorld', (req, res, next) => {
    fetch(guardianWorld)
    .then(response => response.json())
    .then(data => {
    res.send(cleanGuardianData(data.response.results))
    })
    .catch(err => console.log("Error"))
})

app.get('/getNYTimesHome', (req, res, next) => {
    //console.log(NYTimesHome)
    fetch(NYTimesHome)
    .then(response => response.json())
    .then(data => {
        //console.log(data.results);
        res.send(cleanNYTimesData(data.results))
    })
    .catch(err => console.log("Error"))
})

app.get('/getNYTimesWorld', (req, res, next) => {
    fetch(NYTimesWorld)
    .then(response => response.json())
    .then(data => {
        //console.log(data.results);
        res.send(cleanNYTimesData(data.results))
    })
    .catch(err => console.log("Error"))
})

app.get('/getNYTimesPolitics', (req, res, next) => {
    fetch(NYTimesPolitics)
    .then(response => response.json())
    .then(data => {
        //console.log(data.results);
        res.send(cleanNYTimesData(data.results))
    })
    .catch(err => console.log("Error"))
})

app.get('/getNYTimesTechnology', (req, res, next) => {
    fetch(NYTimesTechnology)
    .then(response => response.json())
    .then(data => {
        //console.log(data.results);
        res.send(cleanNYTimesData(data.results))
    })
    .catch(err => console.log("Error"))
})

app.get('/getNYTimesBusiness', (req, res, next) => {
    fetch(NYTimesBusiness)
    .then(response => response.json())
    .then(data => {
        //console.log(data.results);
        res.send(cleanNYTimesData(data.results))
    })
    .catch(err => console.log("Error"))
})

app.get('/getNYTimesSports', (req, res, next) => {
    fetch(NYTimesSports)
    .then(response => response.json())
    .then(data => {
        //console.log(data.results);
        res.send(cleanNYTimesData(data.results))
    })
    .catch(err => console.log("Error"))
})

app.get('/findGuardian', (req, res, next) => {
    var id = req.query.articleId 
    var guardianFindURL = "https://content.guardianapis.com/"+ id +"?api-key=" + guardianAPIKey + "&show-blocks=all";
    //console.log(guardianFindURL)
    fetch(guardianFindURL)
    .then(response => response.json())
    .then(data => {
        //console.log(extractGuardianData(data.response.content))
        res.send(extractGuardianData(data.response.content))
    })
    .catch(err => console.log("Error")) 
})

app.get('/findNYTimes', (req, res, next) => {
    var url = req.query.articleURL 
    var NYTimesFindURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(\""+url+"\")&api-key="+NYTimesAPIKey;
    //console.log(NYTimesFindURL)
    fetch(NYTimesFindURL)
    .then(response => response.json())
    .then(data => {
        //console.log(extractNYTimesData(data.response.docs[0]))
        res.send(extractNYTimesData(data.response.docs[0]))
    })
    .catch(err => console.log("Error"))
})

app.get('/searchNYTimes', (req, res, next) => {
    var searchQuery = req.query.searchQuery 
    var NYTimesSearchURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchQuery + "&api-key="+NYTimesAPIKey ;
    //console.log(NYTimesSearchURL)
    fetch(NYTimesSearchURL)
    .then(response => response.json())
    .then(data => {
        //console.log(extractNYTimesData(data.response.docs[0]))
        //console.log(data)
        res.send(cleanSearchNYTimesData(data.response.docs))
    })
    .catch(err => console.log("Error"))
})

app.get('/searchGuardian', (req, res, next) => {
    var searchQuery = req.query.searchQuery 
    var guardianSearchURL = "https://content.guardianapis.com/search?q="+searchQuery+"&api-key="+guardianAPIKey+"&show-blocks=all"
    //console.log(guardianSearchURL)
    fetch(guardianSearchURL)
    .then(response => response.json())
    .then(data => {
        res.send(cleanGuardianData(data.response.results))
    })
    .catch(err => console.log("Error"))
})

app.listen(port, () => console.log(`App listening on port ${port}!`))