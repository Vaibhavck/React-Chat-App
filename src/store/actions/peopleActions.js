export const getPeople = (people) => {
    return (dispatch, getState) => {
        // make async call to db
        dispatch({
            type: 'GET_PEOPLE',
            people
        });
    }
}