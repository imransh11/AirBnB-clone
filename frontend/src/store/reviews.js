import { csrfFetch } from "./csrf";

//constants
const GET_REVIEWS_BY_SPOTID = 'airbnb/getReviewsBySpotId'
const CREATE_REVIEW = 'airbnb/createReview'
const DELETE_REVIEW = 'airbnb/deleteReview'

//function
const loadReviews = (reviews) => {
    return {
        type: GET_REVIEWS_BY_SPOTID,
        reviews
    }
};

const newReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
};

const DeleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

//thunk
export const getReviewsBySpotId = (spotId) => async (dispatch) => {
    // console.log("INSIDE thunk")
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    // console.log(response, 'after FETCH to backend')

    if(response.ok){
        const ReviewData = await response.json()
        // console.log(ReviewData, 'ReviewDaata')

        dispatch(loadReviews(ReviewData))
        return ReviewData
    }
};

export const createReviewBySpotId = (RevPayload) => async (dispatch) => {
    // console.log(RevPayload, 'INSIDE Create Review')
    const response = await csrfFetch(`/api/spots/${RevPayload.spotId}/reviews`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(RevPayload)
    });
    // console.log(response, 'response from thunk create rev')
    if(response.ok){
        const newCreatedReview = await response.json();
        // console.log(newCreatedReview, 'newRev thunk RES')
        dispatch(newReview(newCreatedReview))
    } else {
        console.log(response, 'response from create rev else')
    }
}

export const deleteReviewById = (reviewId) => async (dispatch) => {
    // console.log(reviewId,'IN delete rev thunk=-=-')

    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    });
    if(response.ok){
        const delData = await response.json;
        // console.log(delData, 'delData======')
        dispatch(DeleteReview(reviewId))
    }

}

//state
const initialState = {}

// reducer
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS_BY_SPOTID: {
            const newState = {};
            const spotReviews = action.reviews.Reviews
            // console.log(spotReviews, 'reducer')

            spotReviews.forEach(review => newState[review.id] = review)
            // console.log(newState, 'newState')
            return newState
        };
        case CREATE_REVIEW: {
            const newState = {...state};
            // console.log(action.review, newState, 'action in State')
            newState[action.review.id] = action.review
            // console.log(newState, 'after adding in state')
            return newState
        };
        case DELETE_REVIEW: {
            const newState = {...state}
            // console.log(action.reviewId, 'del action in state')
            delete newState[action.reviewId]
            return newState
        }
        default:
            return state
    }
}


export default reviewsReducer;
