import React, { useState } from "react";
import "./style.css";
import {
    Container, Input, Row,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SearchTable = (props) => {
    const {list, history, placeholder, onChange, search_keys} = props;
    const navigate = useNavigate()
    const location = useLocation()
    

    const searchParams = new URLSearchParams(location.search);

    const url = location.pathname.split('/')[1]

    const filter = (val) => {
        console.log("List: ", list.length)
        // setValue(val)
        if(val != '') {
            return onChange(list.filter(x => 
                search_keys.includes('full_name') ? 
                x['full_name'].toLowerCase().includes(val.toLowerCase()) || x['mysportfeeds_abbreviation'].toLowerCase().includes(val.toLowerCase()) :
                search_keys.includes('name') ?
                x['name'].toLowerCase().includes(val.toLowerCase()) :
                x['mysportfeeds_abbreviation'].toLowerCase().includes(val.toLowerCase())
                ))
        }
        return onChange(list)
    }

return (
    <div style={{position: "relative"}}>
    <div tabindex="0"  aria-describedby="search-input" className="search-box d-flex justify-content-center align-items-center">
        <div className="mr-2">
            <FontAwesomeIcon id="search-input" icon={faSearch}/>
        </div>
        <div className="text-input">
            <Input placeholder={placeholder} onChange={(e) => filter(e.target.value)} />
        </div>                        
    </div>
    {/* <div className="search-results w-100">
        <div className="w-100">
            {renderChilds()}
        </div>
    </div> */}
    </div>
    )
}

export default SearchTable