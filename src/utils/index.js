const getDate = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp);
    return date.toLocaleString('en-US', { timeZone: 'UTC' });
}

const getDate2 = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp);
    return `${date.getFullYear()}${date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth()}${date.getDate()}`
}

const getDateString = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp);
    return date.toDateString('en-US', { timeZone: 'UTC' });
}

export {
    getDate,
    getDate2,
    getDateString
}