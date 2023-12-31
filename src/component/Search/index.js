import React, { useState } from "react";
import './style.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useNavigate } from 'react-router-dom';
import Image from "../../img";
import constant from '../../pages/mlb/PlayerDetail/constant';
import axios from "axios";
import uuid from 'react-uuid';
import {
  setSport,
  selectSport,
} from '../../reducers/sportSlide';
import { useSelector, useDispatch } from 'react-redux';

function SearchComponent (props) {
    const sportReducer = useSelector(selectSport);
    const [prompt, setPrompt] = useState('')
    const [searchResponse, setSearchResponse] = useState([])
    const [items, setItems] = useState([])
    const navigate = useNavigate();


    const handleOnSearch = async (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        if(string.length == 1 && prompt != string) {
            const response = await axios.get(`https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/search?q=${string}&sport=${sportReducer}`);
            const response2 = JSON.parse(response.data.body)
            console.log("response search", response2)
            console.log("search URL", `https://crfh3pd7oi.execute-api.us-east-1.amazonaws.com/dev/search?q=${string}&sport=${sportReducer}`)
            if(sportReducer == "cbb"){
              setItems(response2)
            }
            else {
              setItems(response2.map(x => x.type == "team" ? ({...x, "img": constant.team_detail[x.img].img, id: uuid()}) : x.type == "game" ? ({...x, "img": Image[x.img], id: uuid()}) : {...x, id: uuid()}))
            }
            setPrompt(string)
        }
        // console.log("items: ", items)
        console.log(`string:  ${string}, results: ${results}`)
      }
    
      const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
      }
    
      const handleOnSelect = (item) => {
        // the item selected
        navigate(item.url)
        console.log(item)
      }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }

      // console.log("items: ", items)
    
      const formatResult = (item) => {
        return (
          <div className="d-flex align-items-center" key={uuid()} style={{zIndex: "100"}}>
            <img src={item.img || Image.PROFILE} style={{width: "20px", height: "20px", objectFit: "cover", borderRadius: "50%", border: "2px solid #000"}}/>
            <span style={{ display: 'block', textAlign: 'left', marginLeft: '1rem'}}>{item.keys}</span>
          </div>
        )
      }

      const showSearchIcon = () => {
        if(items.length > 0){
          return true
        }
        return true
      }


    return (
        <div className="search-component">
            <ReactSearchAutocomplete
                items={items}
                inputDebounce={100}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                autoFocus
                placeholder="Search here!"
                showIcon={showSearchIcon()}
                formatResult={formatResult}
                // maxResults={20}
                fuseOptions={{
                    shouldSort: true,
                    threshold: 0.4,
                    location: 0,
                    distance: 100,
                    ignoreLocation: true,
                    maxPatternLength: 32,
                    findAllMatches: true,
                    minMatchCharLength: 1,
                    keys: [
                    "name",
                    ]
                }}
            />
        </div>
    )
}

export default SearchComponent