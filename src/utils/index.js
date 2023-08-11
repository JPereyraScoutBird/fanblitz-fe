const getDate = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp);
    const date2 = new Date().getTimezoneOffset();
    // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    // console.log(date2)
    return date.toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});
}

const getTodayItems = (dateTimeStamp) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    // console.log(`Date: ${today}, tomorrow: ${tomorrow}`)
    return dateTimeStamp >= getDate(today) && dateTimeStamp < getDate(tomorrow)
}

const filterByDate = (dateTimeStamp, date) => {
    const dateData = new Date(dateTimeStamp);
    let filterDate = date
    filterDate.setHours(0,0,0,0);
    let tomorrow = new Date(filterDate)
    tomorrow.setDate(filterDate.getDate() + 1)
    // console.log(`today: ${filterDate}, tomorrow: ${tomorrow}, ${getDate(filterDate)}, ${dateTimeStamp}`)
    return dateData >= (filterDate) && dateData < (tomorrow)
}

const getTime = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp);
    const date2 = new Date().getTimezoneOffset();
    // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    // console.log(date2)
    return date.toLocaleTimeString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});
}

const removechars = (word) => {
    let newWord = word.replace("/", "-");
    return newWord
}

const getDate2 = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp);
    // console.log("date: ", date)
    return `${date.getFullYear()}${date.getMonth() < 10 ? '0'+(date.getMonth() + 1) : date.getMonth()}${date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()}`
}

const getDateString = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp);
    return date.toDateString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
}

const sortListArticles = (date1, date2) => {
    const date1Aux = new Date(date1.publishedAt);
    const date2Aux = new Date(date2.publishedAt);
  
    return date2Aux - date1Aux;
  
  };

export {
    getDate,
    getDate2,
    getDateString,
    getTime,
    getTodayItems,
    filterByDate,
    sortListArticles,
    removechars
}