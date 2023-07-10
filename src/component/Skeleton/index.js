import React from "react";
import './style.css'
import { Table } from "reactstrap";

const SkeletonElements = ({type}) => {

    const classes = `skeleton ${type}`
    return (
        <div className={classes}></div>
    )
}


export default SkeletonElements