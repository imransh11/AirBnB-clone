// constants
const GET_ALL_SPOTS = 'airbnb/getAllSpots'
const SPOT_DETAIL = 'airbnb/spotDetail'

//regular
const loadSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
};

const spotDetailById = (spotById) => {
    return {
        type: SPOT_DETAIL,
        spotById
    }
}

//thunk
export const getAllSpots = () => async (dispatch) => {
    // console.log("INSIDE")
    const response = await fetch('/api/spots');
    // console.log("OUTSIDE", response)

    if(response.ok) {
        const data = await response.json();

        // console.log(data, "data------------------")
        dispatch(loadSpots(data));
        return data
    }
};

export const spotDetail = (spotId) => async (dispatch) => {
    console.log('IN THUNK')
    const response = await fetch(`/api/spots/${spotId}`)
    console.log(response, 'SPOTdetail')

    if(response.ok){
        const DetailData = await response.json()
        console.log(DetailData, 'DETAILDATA')

        dispatch(spotDetailById(DetailData))
        return DetailData
    }
};

//state
const initialState = {};

//reducer
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const newState = {};
            const test = action.spots.Spots
            // console.log(test, 'REDUCER')
            test.forEach(spot => newState[spot.id] = spot)
            return newState
        }
        case SPOT_DETAIL: {
            const newState = {};
            const spot  = action.spotById
            console.log(spot, 'spot detail STATE')

            newState[spot.id] = spot
            console.log(newState, 'newState')
            return newState
        }
        default:
            return state
    }
}

export default spotsReducer
