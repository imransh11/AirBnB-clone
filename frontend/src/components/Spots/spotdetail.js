import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { spotDetail } from "../../store/spots"
import { getReviewsBySpotId } from "../../store/reviews"
import SpotImage from "./spotImage"


const SpotDetails = () => {
    const dispatch = useDispatch()

    const {spotId} = useParams()
    const spotClicked = useSelector((state) => state.spots[spotId])
    const img = spotClicked.SpotImages //loading later
    const spotReviews = useSelector(state => Object.values(state.reviews))
    console.log(spotClicked,spotReviews,img , spotId, 'spot----byID-----------')


    useEffect(() => {
        console.log('IN SPOTDETAIL useEFFECT')
        dispatch(spotDetail(spotId))
        dispatch(getReviewsBySpotId(spotId))
    }, [dispatch, spotReviews.length])

    //reload error
    if(!img){
        return (
            <>
                {console.log('before useEffect')}
                <p>loading...</p>
            </>
        )
    }

    console.log('TEST--------------------')
    return (

        <div>
            { spotClicked &&
                <>
                    <div>
                        <h1>{spotClicked.name}</h1>
                        <p>{spotClicked.city}, {spotClicked.state}, {spotClicked.country}</p>
                    </div>
                    <div>{spotClicked.SpotImages.map((img) => (
                        <SpotImage imgDetail={img}/>
                    ))}</div>
                    <div>
                        <h3>Hosted By {spotClicked.Owner.firstName} {spotClicked.Owner.lastName}</h3>
                        <p>{spotClicked.description}</p>
                    </div>
                    <div>
                        <p> <b>${spotClicked.price}</b> night </p>
                        <p> {spotClicked.avgStarRating} #{spotClicked.numReviews}</p>
                        <button>Reserve</button>
                    </div>
                    {
                        spotReviews &&

                    <div>
                        {spotReviews.map((rev) => (
                            <div key={rev.id}>
                                {rev.review}
                            </div>
                        ))}

                    </div>
                    }

                </>
                }
        </div>
    )
}

export default SpotDetails;
