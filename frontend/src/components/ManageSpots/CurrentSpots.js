import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CurrentUserSpots } from "../../store/spots"
import { NavLink, Route, useHistory } from "react-router-dom"
import Updated from "../UpdateSpot"
import Modal from "../DeleteSpotModal/DeleteSpotModal"
import "./ManageSpot.css"




const CurrentSopts = () => {
    const dispatch = useDispatch()

    const spotsArr = useSelector(state => Object.values(state.spots))
    const userCurr = useSelector(state => state)
    console.log(spotsArr, userCurr, 'currentSpots------')
    const history = useHistory()



    useEffect(() => {
        // console.log('in useEFFECT_-------')
        userCurr.session.user? dispatch(CurrentUserSpots()) : history.push('/')
    }, [dispatch, userCurr.session.user])

    if(!spotsArr){
        return(
            <p>loading...</p>
            )
        }
        // console.log(spotsArr, 'test--------')
    return (
        <>
            {!spotsArr.length ? <div>
                <NavLink to={'/spots/new'}>
                    <button>Create a New Spot</button>
                </NavLink>
            </div> :
            <div>

                <div>
                    {spotsArr.map(spot => (
                        <>
                            <div key={spot.id} className="spotsManage">
                                <div>
                                    <NavLink to={`/spots/${spot.id}`}>
                                        <div>
                                            <img className="manageSpotImage" src={spot.previewImage} />
                                        </div>
                                    </NavLink>
                                </div>
                                <div>
                                    <div>
                                        <div className="manageSpotInfo">
                                            Name: {spot.name}
                                        </div>
                                        <div className="manageSpotInfo">
                                            Address: {spot.address} {spot.city}, &nbsp;
                                            {spot.state}
                                        </div>
                                        <div className="manageSpotInfo">
                                            Description: {spot.description}
                                        </div>
                                        <div className="manageSpotInfo">
                                            {!spot.avgRating ? <div><i class="fa-solid fa-star"></i> New</div> : <div>
                                                Rating:&nbsp;
                                            <b><i class="fa-solid fa-star"></i> {spot.avgRating.toFixed(1)}</b>
                                            </div>}
                                        </div>
                                        <div className="manageSpotInfo">
                                            Price: <b>${spot.price}</b> per night
                                        </div>
                                    </div>
                                    <div className="manageSpotBtns">
                                        <div className="manageSpotUpdate">
                                                <button className="manageSpotUpdateBtn" onClick={
                                                        () => history.push(`/spots/${spot.id}/edit`)
                                                }>Update Spot Details</button>
                                        </div>
                                        <div>
                                            <Modal spotId ={spot.id}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>}
        </>
    )
}

export default CurrentSopts
