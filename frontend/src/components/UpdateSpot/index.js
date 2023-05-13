import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import UpdateSpot from "./UpdateSpot"
import { useEffect } from "react"
import { spotDetail } from "../../store/spots"


const Updated = () => {

    const dispatch = useDispatch();

    const {spotId} = useParams()
    const spot = useSelector(state => state.spots[spotId])
    // console.log(spot, spotId, 'test---------------')

    useEffect(() => {
        // console.log('IN USEEFFECT-------UPDATE')
        dispatch(spotDetail(spotId))
    }, [dispatch]);

    if(!spot){
        return (
            <p>loading...</p>
        )
    };

    if(!spot.SpotImages){
        return (
            <p>loading...</p>
        )
    }

    return (
        <UpdateSpot spot={spot} />
    )
}

export default Updated;
