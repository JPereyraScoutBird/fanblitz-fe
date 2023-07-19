const getDate = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp);
    const date2 = new Date().getTimezoneOffset();
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    console.log(date2)
    return date.toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});
}

const getTime = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp);
    const date2 = new Date().getTimezoneOffset();
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    console.log(date2)
    return date.toLocaleTimeString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});
}

const getDate2 = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp);
    console.log("date: ", date)
    return `${date.getFullYear()}${date.getMonth() < 10 ? '0'+(date.getMonth() + 1) : date.getMonth()}${date.getDate()}`
}

const getDateString = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp);
    return date.toDateString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
}

export {
    getDate,
    getDate2,
    getDateString,
    getTime
}