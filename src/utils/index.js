export const getDate = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp);
    console.log("date: ", date)
    return date.toLocaleString();
}
