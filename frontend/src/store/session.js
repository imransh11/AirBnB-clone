import { csrfFetch } from "./csrf"


const SET_USER = 'session/setUser'
const REMOVE_USER = 'session/removeUser'

//reducer
const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}

//thunk
export const login = (user) => async dispatch => {
    // console.log('INSIDE', user);

    const { credential, password } = user
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            credential,
            password
        })
    });
    // console.log('OUTSIDE', res)

    if(res.ok){
        const data = await res.json();
        // console.log(data, 'data---')
        dispatch(setUser(data.user));
        return res;
    }
}

//state

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case SET_USER:
                newState = Object.assign({}, state)
                newState.user = action.payload;
                return newState;
        case REMOVE_USER:
                newState = Object.assign({}, state)
                newState.user = null;
                return newState;
        default:
            return state
    }
}

export default sessionReducer;
