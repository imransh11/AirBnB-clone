import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { spotDetail } from "../../store/spots"
import { getReviewsBySpotId } from "../../store/reviews"


const SpotDetails = () => {
    const dispatch = useDispatch()

    const {spotId} = useParams()
    const spotClicked = useSelector((state) => state.spots[spotId])
    const spotReviews = useSelector(state => (state.reviews))
    console.log(spotReviews, spotId, 'spot----byID-----------')


    useEffect(() => {
        console.log('IN SPOTDETAIL useEFFECT')
        dispatch(spotDetail(spotId))
        dispatch(getReviewsBySpotId(spotId))
    }, [dispatch])
    let spotRev
    // if(spotReviews){
    //     spotRev = Object.values(spotReviews)
    // }
    // console.log(spotRev, 'spotRev--------=====rev')
    console.log('TEST--------------------')
    return (

        <div>
            { spotClicked &&
                <>
                    <div>
                        <h1>{spotClicked.name}</h1>
                        <p>{spotClicked.city}, {spotClicked.state}, {spotClicked.country}</p>
                    </div>
                    <div>{spotClicked.SpotImages.url}</div>
                    <div>
                        <h3>Hosted By {spotClicked.Owner.firstName} {spotClicked.Owner.lastName}</h3>
                        <p>{spotClicked.description}</p>
                    </div>
                    <div>
                        <p> <b>${spotClicked.price}</b> night </p>
                        <p> {spotClicked.avgStarRating} #{spotClicked.numReviews}</p>
                        <button>Reserve</button>
                    </div>
                    <div>


                    </div>

                </>
                }
             {/* <p>{spot.city}</p> */}
        </div>
    )
}

export default SpotDetails;
