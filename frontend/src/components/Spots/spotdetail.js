import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { spotDetail } from "../../store/spots"
import { getReviewsBySpotId } from "../../store/reviews"
import SpotImage from "./spotImage"
import PostReviewModal from "../PostReviewModal/PostReviewModal"
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal"
// import './SpotDetail.css'


const SpotDetails = () => {
    const dispatch = useDispatch()

    const {spotId} = useParams()
    const spotClicked = useSelector((state) => state.spots[spotId])
    const sessionUser = useSelector(state => state.session)
    const spotReviews = useSelector(state => Object.values(state.reviews))
    console.log(spotClicked,spotReviews, spotId, sessionUser,'spot----byID-----------')


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
        });

        //rev date
        const revDate = new Date ()

    // console.log(spotRevUserId ,'TEST--------------------')
    return (

        <div className="spotdetail-container">
            { spotClicked &&
                <>
                    <div className="spotdetail-state-city-country">
                        <h1>{spotClicked.name}</h1>
                        <p>{spotClicked.city}, {spotClicked.state}, {spotClicked.country}</p>
                    </div>
                    <div className="spotdetail-images">{spotClicked.SpotImages.map((img) => (
                        <SpotImage imgDetail={img}/>
                    ))}</div>
                    <div className="spotdetail-details">
                        <div className="">
                            <h3>Hosted By {spotClicked.Owner.firstName} {spotClicked.Owner.lastName}</h3>
                            <p>{spotClicked.description}</p>
                        </div>
                        <div className="">
                            <p> <b>${spotClicked.price}</b> night </p>
                            <div>
                                <div>
                                        {spotClicked.numReviews === 0 ? <p><i class="fa-solid fa-star"></i>New</p> : <p>
                                            {spotClicked.numReviews > 1 ? <div>
                                                <i class="fa-solid fa-star"></i>{spotClicked.avgStarRating.toFixed(1)} · <b>#{spotClicked.numReviews} reviews</b></div> : <div>
                                                <i class="fa-solid fa-star"></i>{spotClicked.avgStarRating.toFixed(1)} · <b>#{spotClicked.numReviews} review</b></div>}
                                            </p>}
                                </div>
                            </div>
                            <button onClick={() => {return alert('Feature coming soon')}}>Reserve</button>
                        </div>
                    </div>
                    <div className="spotdetail-reviews">

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

                        <div>
                        {spotClicked.numReviews === 0 ? <div><i class="fa-solid fa-star"></i>New <p>Be the first to post a review!</p></div> : <p>
                                            {spotClicked.numReviews > 1 ? <div>
                                                <i class="fa-solid fa-star"></i>{spotClicked.avgStarRating.toFixed(1)} · <b>#{spotClicked.numReviews} reviews</b></div> : <div>
                                                <i class="fa-solid fa-star"></i>{spotClicked.avgStarRating.toFixed(1)} ·  <b>#{spotClicked.numReviews} review </b></div>}
                                            </p>}
                        </div>
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

                                            (sessionUser.user.id === rev.userId)?
                                            <div>
                                                <DeleteReviewModal reviewId ={rev.id}/>
                                            </div> : <div></div>
                                    }
                                </div>
                            ))}

                        </div>
                        }
                    </div>

                </>
                }

        </div>
    )
}

export default SpotDetails;
