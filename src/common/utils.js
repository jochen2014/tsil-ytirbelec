export const sortDataByField = data => (i1, i2) => {
    const result = Date.parse(i1.dateCreated_raw) - Date.parse(i2.dateCreated_raw);
    return order === 'ascending' ? result : result * -1;
}
export const filterDataByState = state => data => {
    if (state === 'all') {
        return true;
    }
    return data.state === data;
}
