import { csrfFetch } from "./csrf";

// constants
const GET_ALL_SPOTS = 'airbnb/getAllSpots'
const SPOT_DETAIL = 'airbnb/spotDetail'
const CREATE_SPOT = 'airbnb/createSpot'
const Current_User_Spots = 'airbnb/currentUsersSpots'

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

const createSpot = newSpot => ({
    type: CREATE_SPOT,
    newSpot
})

const currentUser = currSpots => {
    return {
        type: Current_User_Spots,
        currSpots
    }
};

// const updateSpot =

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
    console.log(response.body, 'SPOTdetail')

    if(response.ok){
        const DetailData = await response.json()
        console.log(DetailData, 'DETAILDATA')

        dispatch(spotDetailById(DetailData))
        return DetailData
    }
};

export const CreateNewSpot = (payload) => async (dispatch) => {
    console.log(payload, 'INSIDE')
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if(response.ok){
        const newSpot = await response.json();
        dispatch(createSpot(newSpot))

        //res
        const imageArr = payload.img
        for(let i=0; i<imageArr.length; i++){
            let obj = {}

            if(imageArr[i].length > 0) {

                obj.url = imageArr[i]

                if(i === 0){
                    obj.preview = true
                }

                const responseImg = await csrfFetch(`/api/spots/${newSpot.id}/images`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                }
                )
            }
        }
        return newSpot;
    }
};

export const CurrentUserSpots = () => async (dispatch) => {
    console.log('IN THUNK')
    const response = await csrfFetch('/api/spots/current');

    console.log(response, 'res---------------')
    if(response.ok){
        const dataCurr = await response.json()
        console.log(dataCurr, 'current------Thunk')

        dispatch(currentUser(dataCurr))
        return dataCurr
    }
};

export const updateSpot = spot => async dispatch => {
    const response = await fetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    });
    if(response.ok){
        const spot = await response.json();
        dispatch(createSpot(spot))
        return spot;
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
        case CREATE_SPOT: {
            let newState = {};

            return newState = {...state, [action.newSpot.id]: action.newSpot}
        }
        case Current_User_Spots: {
            let newState = {}

            const spotsObj = action.currSpots
            console.log(spotsObj, 'spotsObj-------')

            return newState = spotsObj
        }
        default:
            return state
    }
}

export default spotsReducer
