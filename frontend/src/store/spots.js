// constants
const GET_ALL_SPOTS = 'airbnb/getAllSpots'

//regular
const loadSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
};

//thunk
export const getAllSpots = () => async (dispatch) => {
    console.log("INSIDE")
    const response = await fetch('/api/spots');
    console.log("OUTSIDE", response)

    if(response.ok) {
        const data = await response.json();

        console.log(data, "data------------------")
        dispatch(loadSpots(data));
        return data
    }
}

//state
const initialState = {};

//reducer
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const newState = {};
            const test = action.spots.Spots
            console.log(test, 'REDUCER')
            test.forEach(spot => newState[spot.id] = spot)
            return newState
        }
        default:
            return state
    }
}

export default spotsReducer
