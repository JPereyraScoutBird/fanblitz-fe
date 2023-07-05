export const getDate = (dateTimeStamp) => {
    const date = new Date(dateTimeStamp);
    return date.toLocaleString('en-US');
}
