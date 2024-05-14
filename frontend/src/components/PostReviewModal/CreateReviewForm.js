import React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createReviewBySpotId } from "../../store/reviews"
import { spotDetail } from "../../store/spots"


const CreateReviewForm = ({toggleModal}) => {

    const dispatch = useDispatch()

    const [review, setReview] = useState('')
    const [stars, setStars] = useState("")
    const [errors, setErrors] = useState('')


    const Rev = useSelector(state => state)
    const StateSpot = useSelector(state => Object.values(state.spots))
    // console.log(Rev.session.user.id, StateSpot, 'rev---------revForm')


    const checkStat = () => {
        if(!(review && review.length > 9) || stars < 1){
            return true
        } else return false
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors('')
        // console.log('test handle----------')

        const RevPayload = {
            spotId: StateSpot[0].id,
            userId: Rev.session.user.id,
            review,
            stars
        };

        let newReviewbySpotId = await dispatch(createReviewBySpotId(RevPayload))
        .catch(async (res) => {
            const data = await res.json();
            // console.log(data, data.message, 'outside if')


            if (data.message){
                // console.log(data.message, 'message-----------')
                setErrors(data.message)
                // console.log(errors, 'inside error')
                return
            }
            // console.log(errors, 'test------')
        })
        // console.log(newReviewbySpotId, errors, 'newReview in create rev form')

        await dispatch(spotDetail(RevPayload.spotId));
        // console.log(errors, 'out------------')
        if(errors.message){
            toggleModal()
        }
        if(!errors.message){
            toggleModal()
        }

    }


    return (
        <>
            <div>
                <h3>How was your stay?</h3>
            </div>
            <form onSubmit={handleSubmit}>
                    <div>
                        {errors ? <div>{errors}</div> : <div></div>}
                    </div>
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
                        <button className="reviewSubmit-btn" type="submit" disabled={checkStat()}
                        >Submit Your Review</button>
                    </div>
            </form>
        </>

    )
}

export default CreateReviewForm;
