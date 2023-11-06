const getDate = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp);
    const date2 = new Date().getTimezoneOffset();
    // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    // console.log(date2)
    return date.toLocaleString('en-US', {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});
}

const getTimeGame = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp);
    return date.toLocaleTimeString('en-US', {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      hour: '2-digit',
      minute: '2-digit',
    });
}

const getZTime = (dateTimeStamp) => {
    console.log("datetime: ", dateTimeStamp)
    var year        = dateTimeStamp.substring(0,4);
    var month       = dateTimeStamp.substring(4,6);
    var day         = dateTimeStamp.substring(6,8);
    var date        = new Date(year, month-1, day);
    console.log("date: ", date)
    return getDate2(date)
}

const getPaid = (value) => {
    if (value === true){
        return "Yes"
    }
    return "No"
}

const getTodayItems = (dateTimeStamp, day = null) => {

    let today = new Date();
    if (day != null){
        today = new Date(day);
    }
    
    today.setHours(0,0,0,0);
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    // console.log(`Date: ${today}, tomorrow: ${tomorrow}`)
    // console.log("dateTimeStamp >= getDate(today)", dateTimeStamp >= getDate(today), dateTimeStamp, getDate(today))
    return dateTimeStamp >= getDate(today) && dateTimeStamp < getDate(tomorrow)
}

const filterByDate = (dateTimeStamp, date) => {
    // console.log(date, getTodayItems)
    const dateData = new Date(dateTimeStamp);
    let filterDate = date
    filterDate.setHours(0,0,0,0);
    let tomorrow = new Date(filterDate)
    tomorrow.setDate(filterDate.getDate() + 1)
    // console.log(`today: ${filterDate}, tomorrow: ${tomorrow}, ${getDate(filterDate)}, ${dateTimeStamp}`)
    return dateData >= (filterDate) && dateData < (tomorrow)
}

const filterByDateGameCard = (dateTimeStamp, date, status) => {
    // console.log(date, getTodayItems)
    const dateData = new Date(dateTimeStamp);
    const dateDataToday = new Date();
    let filterDate = date
    filterDate.setHours(0,0,0,0);
    let tomorrow = new Date(filterDate)
    let yesterday = new Date(filterDate)
    tomorrow.setDate(filterDate.getDate() + 1)
    yesterday.setDate(filterDate.getDate() - 2)
    // console.log(`today: ${filterDate}, tomorrow: ${tomorrow}, ${getDate(filterDate)}, ${dateTimeStamp}`)
    // return dateData >= (filterDate) && dateData < (tomorrow)
    if((status != null && dateData < (yesterday))){
        return false
    }
    if(dateData >= (filterDate) && dateData < (tomorrow) ){
        return true
    }
    return false
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
    return `${date.getFullYear()}${date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1}${date.getDate() + 1 < 10 ? '0'+(date.getDate()) : date.getDate()}`
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
    removechars,
    getPaid,
    getZTime,
    filterByDateGameCard,
    getTimeGame
}