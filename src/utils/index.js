const getDate = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp);
    return date.toLocaleString('en-US', { timeZone: 'UTC' });
}


const getDateString = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp);
    return date.toDateString('en-US', { timeZone: 'UTC' });
}

export {
    getDate,
    getDateString
}