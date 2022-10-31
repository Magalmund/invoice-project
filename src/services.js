export const setDate = (date, difference) => {
    date.setDate(date.getDate() + difference);
    let resultDate = date.toISOString().substr(0, 10);
    return resultDate
}