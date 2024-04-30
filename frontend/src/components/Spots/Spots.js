import { useDispatch, useSelector} from "react-redux"
import { getAllSpots } from "../../store/spots";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./MainPage.css"

const Spots = () => {
    const dispatch = useDispatch();
    const spotList = useSelector((state) => Object.values(state.spots))
    // console.log(spotList, 'spotList---')


    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return (
        <>
        <h1>Spots</h1>
        <div className="main-page-outside-container">
            {spotList.map((spot) => (
                <div key={spot.id} className="main-page-inside-container">
                    <span className="main-page-tooltip">{spot.name}</span>
                    <div className="main-page-spot">
                        <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                            <div>
                                <img src={spot.previewImage} className="main-page-image"/>
                            </div>
                        <div className="main-page-location-rating">
                            <div className="cityName">{spot.city}, {}
                                {spot.state}
                            </div>
                            <div className="">{!spot.avgRating ? <div className=""><i class="fa-solid fa-star"></i> New </div> : 
                                <div>
                                <i class="fa-solid fa-star"></i> {spot.avgRating.toFixed(1)} </div>}</div>
                        </div>
                        <div className="main-page-price" style={{fontWeight: "bold"}}>${spot.price} &nbsp;<div style={{fontWeight: 'normal'}}>night</div></div>
                        </NavLink>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export default Spots;
