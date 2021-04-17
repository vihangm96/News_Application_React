import React from 'react'
import AsyncSelect from 'react-select/async'
import _ from "lodash"
import { withRouter} from "react-router-dom";
import './style.css'

class Searchbar extends React.Component{
      constructor(){
      super()
      this.state = {
                    inputValue: '',
                    results:[]
                   }

      this.handleSelectChange = this.handleSelectChange.bind(this)
      this.getOptions = _.debounce(this.getOptions.bind(this), 400);
      //this.getOptions = this.getOptions.bind(this);
      }

      getOptions(inputValue, callback){

        if (!inputValue) {
            return callback([]);
        }
        
        this.setState({inputValue:inputValue})
        try { 
            fetch("https://csci572a8.cognitiveservices.azure.com/bing/v7.0/suggestions?q="+inputValue,
                {
                  headers: {
                    "Ocp-Apim-Subscription-Key": "8fee4de5ac9040dfb2e9a9fe377cd542"
                  }
                }
            )
            .then(response => response.json())
            .then(data => {
                try{
                    const rawResults = data.suggestionGroups[0].searchSuggestions;
                    const results = rawResults.map(result => 
                                                      ({label: result.displayText,
                                                        value: result.displayText }))
                    this.setState(
                                  { results:results }
                                  )
                    callback(results)
                }
                catch(error){
                    console.error('Error fetching')
                    return this.state.results
                }
            })
        }
          catch (error) {
            console.error(`Error fetching search ${inputValue}`);
            return this.state.results
          }
      }

      handleSelectChange(event){
          this.props.onSearchHandler()
          this.props.history.push(`search?q=${event.value}`);
      }


      render(){
            var path = this.props.location.pathname
            //console.log(path)
            return(
            <div className="search">
                  {
                  path==="/search" ?
                        <AsyncSelect

                            cacheOptions
                            loadOptions={this.getOptions}
                            defaultOptions
                            onChange={this.handleSelectChange}
                            placeholder= "Enter keyword .."
                            noOptionsMessage={()=>
                                              {return "No Match"}}
                        />
                  :
                        <AsyncSelect
                            cacheOptions
                            loadOptions={this.getOptions}
                            defaultOptions
                            onChange={this.handleSelectChange}
                            value=''
                            placeholder= "Enter keyword .."
                            noOptionsMessage={()=>
                                              {return "No Match"}}
                        />
                  }
            </div>
            )
      }
}

export default withRouter(Searchbar)