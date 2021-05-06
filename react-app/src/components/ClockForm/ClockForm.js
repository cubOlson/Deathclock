import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { createClockThunk } from '../../store/clock'

function CreateClockForm(){
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [danger, setDanger] = useState(0)
    const [endDate, setEndDate] = useState("")
    const [address, setAddress] = useState("")
    const [startLat, setStartLat] = useState(0)
    const [startLong, setStartLong] = useState(0)
    const [endLat, setEndLat] = useState(0)
    const [endLong, setEndLong] = useState(0)
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        setErrors([])

        const payload = {
            userId,
            title,
            description,
            danger,
            endDate,
            address,
            startLat,
            startLong,
            endLat,
            endLong
        }

        dispatch(createClockThunk(payload))
            .catch(async (res) => {
                console.log('---------------', res)
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)

            })
        history.push('/clockTest')
    }

    let userId
    if (user){
        userId = user.id
    }

    const today = new Date().toISOString()
    console.log('TODAY', today)

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Create a DeathClock</h2>
                <p>The clock is created and activated on form submission. Please cancel
                    the clock as soon as you are being safe again. On running down to 0,
                    your friends will be notified and (in development) your mom will be called.
                </p>
                <ul>
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                </ul>
                <input
                    type="text"
                    placeholder="Title your adventure."
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                >
                </input>
                <textarea
                    type="textarea"
                    placeholder="Describe your adventure. Be specific, in case of trouble."
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <select
                    onChange={e => setDanger(e.target.value)}
                    value={danger}
                >
                    <option value='0'>0 - Walk in the Park</option>
                    <option value='1'>1 - Light Risk</option>
                    <option value='2'>2 - Mom Wouldn't Like It</option>
                    <option value='3'>3 - Definite Risk</option>
                    <option value='4'>4 - Entering the Danger Zone</option>
                    <option value='5'>5 - I am Danger</option>
                </select>
                <input 
                    type="datetime-local" 
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    min={today} 
                    max="2030-06-14T00:00"
                >
                </input>
                <input
                    type="text"
                    placeholder="(Optional) List an address for your adventure."
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                >
                </input>
                <input
                    type="number"
                    step=".00001"
                    placeholder="(Optional) Starting latitude."
                    value={startLat}
                    onChange={e => setStartLat(e.target.value)}
                >
                </input>
                <input
                    type="number"
                    step=".00001"
                    placeholder="(Optional) Starting longitude."
                    value={startLong}
                    onChange={e => setStartLong(e.target.value)}
                >
                </input>
                <input
                    type="number"
                    step=".00001"
                    placeholder="(Optional) Destination latitude."
                    value={endLat}
                    onChange={e => setEndLat(e.target.value)}
                >
                </input>
                <input
                    type="number"
                    step=".00001"
                    placeholder="(Optional) Destination longitude."
                    value={endLong}
                    onChange={e => setEndLong(e.target.value)}
                >
                </input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateClockForm