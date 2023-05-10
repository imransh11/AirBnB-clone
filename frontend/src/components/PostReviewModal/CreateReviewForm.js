import React, { useEffect } from "react"
import { useState } from "react"


const CreateReviewForm = () => {

    const [review, setReview] = useState('')
    const [stars, setStars] = useState("0")


    const checkStat = () => {
        if(!(review && review.length > 9) || stars < 1){
            return true
        } else return false
    }


    return (
        <>
            <div>
                <h3>How was your stay?</h3>
            </div>
            <form>
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
                        <button type="button" disabled={checkStat()}>Submit Your</button>
                    </div>
            </form>
        </>

    )
}

export default CreateReviewForm;
