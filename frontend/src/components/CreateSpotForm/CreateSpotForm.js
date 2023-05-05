import { useState } from "react"
import { useDispatch } from "react-redux"
import { CreateNewSpot } from "../../store/spots"






const CreateSpotForm = () => {

    const [country, setCountry] = useState('')
    const [streetAdress, setStreeAdress] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(CreateNewSpot())
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label>
                    Country
                    <input value={country}
                    onChange={(e) => setCountry(e.target.value)}/>
                </label>
                <label>
                    Street Adress
                    <input
                        value={streetAdress}
                        onChange={(e) => setStreeAdress(e.target.value)}
                    />
                </label>
            </form>
        </section>
    )
}

export default CreateSpotForm
