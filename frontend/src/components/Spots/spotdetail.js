import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { spotDetail } from "../../store/spots"
import { getReviewsBySpotId } from "../../store/reviews"
import SpotImage from "./spotImage"
import PostReviewModal from "../PostReviewModal/PostReviewModal"
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal"


const SpotDetails = () => {
    const dispatch = useDispatch()

    const {spotId} = useParams()
    const spotClicked = useSelector((state) => state.spots[spotId])
    const sessionUser = useSelector(state => state.session)
    const spotReviews = useSelector(state => Object.values(state.reviews))
    // console.log(spotClicked,spotReviews, spotId, sessionUser,'spot----byID-----------')


    useEffect(() => {
        // console.log('IN SPOTDETAIL useEFFECT')
        dispatch(spotDetail(spotId))
        dispatch(getReviewsBySpotId(spotId))
    }, [dispatch, spotReviews.length])

    //reload error
        if(!spotClicked){
                return (
                    <>
                        <p>loading...</p>
                    </>
                )
            };

        if(!spotClicked.SpotImages){
            return (
                <p>loading...</p>
            )
        };

        // if(!sessionUser.user){
        //     return(
        //         <p>loading...</p>
        //     )
        // }

        let spotRevUserId = [] // ids of user who posted rev
        spotReviews.forEach((rev) => {
            spotRevUserId.push(rev.userId)
        })

    // console.log(spotRevUserId ,'TEST--------------------')
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
                        <div> {spotClicked.avgStarRating}
                            <div>
                                    {spotClicked.numReviews === 0 ? <p>New</p> : <p>
                                        {spotClicked.numReviews > 1 ? <b>#{spotClicked.numReviews} reviews</b> : <b>#{spotClicked.numReviews} review</b>}
                                        </p>}
                            </div>
                        </div>
                        <button>Reserve</button>
                    </div>
                    {
                        (sessionUser.user) &&
                        <div>

                            {
                                (sessionUser.user.id !== spotClicked.ownerId) &&
                                !(spotRevUserId.includes(sessionUser.user.id))?
                                <div>
                                    <PostReviewModal />
                                </div> : <div></div>
                            }
                        </div>
                    }
                    {
                        spotReviews &&

                    <div>
                        {spotReviews.map((rev) => (
                            <div key={rev.id}>
                                <div>
                                    {!rev.User ? <p>loading...</p> : <b>{rev.User.firstName}</b>}
                                </div>
                                <div>
                                {rev.review}
                                </div>

                                {sessionUser.user &&
                                // <div>
                                //     {

                                        (sessionUser.user.id === rev.userId)?
                                        <div>
                                            <DeleteReviewModal reviewId ={rev.id}/>
                                        </div> : <div></div>
                                //     }
                                // </div>
                                }
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
