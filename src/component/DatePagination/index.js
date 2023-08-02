import React, { useState } from 'react'
import { Button } from 'reactstrap'
import moment from 'moment'
import Moment from 'react-moment'
import './style.css'

function DatePagination (props) {
    const [error, setError] = useState(false)
    const [page, setPage] = useState(1)

    const {
        onClick,
        date
    } = props

    const onClickCallback = () => (
        onClick(moment(date).subtract('days', 1))
    )

    const onClickPrev = () => (
        onClick(moment(date).add('days', 1))
    )
    // const [date,  =setDate] = useState(new Date().toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}))

    return (
        <div id="date-pagination">
            <div className='d-flex justify-content-center align-items-center'>
                <div>
                    <Button className="btn btn-success"onClick={onClickCallback}>{ '<' }</Button>
                </div>
                <div>
                    <p><Moment date={date} format='ddd Do MMM YYYY' /></p>
                </div>
                <div>
                    <Button className="btn btn-success" onClick={onClickPrev}>{ '>' }</Button>
                </div>
            </div>
        </div>
    )

}

export default DatePagination