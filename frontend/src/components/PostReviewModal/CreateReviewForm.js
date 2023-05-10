import React, { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createReviewBySpotId } from "../../store/reviews"
import { spotDetail } from "../../store/spots"


const CreateReviewForm = () => {

    const dispatch = useDispatch()

    const [review, setReview] = useState('')
    const [stars, setStars] = useState("0")
    const [validationsErrors, setValidationErrors] = useState({})

    const Rev = useSelector(state => state)
    const StateSpot = useSelector(state => Object.values(state.spots))
    console.log(Rev.session.user.id, StateSpot, 'rev---------revForm')


    const checkStat = () => {
        if(!(review && review.length > 9) || stars < 1){
            return true
        } else return false
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('test handle----------')
        // const errors = {};
        // if(review && review.length < 10) errors['review'] = 'need at least ten character.'
        // if(stars < 1) errors['stars'] = 'needs rating'

        // if(Object.values(errors).length){
        //     setValidationErrors(errors)
        //     return alert('cannot submit')
        // };

        const RevPayload = {
            spotId: StateSpot[0].id,
            userId: Rev.session.user.id,
            review,
            stars
        };

        let newReviewbySpotId = await dispatch(createReviewBySpotId(RevPayload))
        console.log(newReviewbySpotId, 'newReview in create rev form')
        await dispatch(spotDetail(RevPayload.spotId))
    }


    return (
        <>
            <div>
                <h3>How was your stay?</h3>
            </div>
            <form onSubmit={handleSubmit}>
                    <div>
                        <textarea
                        placeholder="Leave your review here..."
                        required
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Stars"
                            required
                            min={"1"}
                            max={"5"}
                            value={stars}
                            onChange={(e) => setStars(e.target.value)}
                        />
                    </div>

                    <div>
                        <button type="submit" disabled={checkStat()}>Submit Your</button>
                    </div>
            </form>
        </>

    )
}

export default CreateReviewForm;
