//constants
const GET_REVIEWS_BY_SPOTID = 'airbnb/getReviewsBySpotId'

//function
const loadReviews = (reviews) => {
    return {
        type: GET_REVIEWS_BY_SPOTID,
        reviews
    }
}

//thunk
export const getReviewsBySpotId = (spotId) => async (dispatch) => {
    console.log("INSIDE thunk")
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    console.log(response, 'after FETCH to backend')

    if(response.ok){
        const ReviewData = await response.json()
        console.log(ReviewData, 'ReviewDaata')

        dispatch(loadReviews(ReviewData))
        return ReviewData
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
            console.log(spotReviews, 'reducer')

            spotReviews.forEach(review => newState[review.id] = review)
            console.log(newState, 'newState')
            return newState
        }
        default:
            return state
    }
}


export default reviewsReducer;
