import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'
import { createClockThunk, getClockThunk } from '../../store/clock'
import { setFormThunk } from '../../store/form'

import './ClockForm.css'

function CreateClockForm(){
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [danger, setDanger] = useState(1)
    const [endDate, setEndDate] = useState(new Date())
    const [address, setAddress] = useState("")
    const [startLat, setStartLat] = useState(0)
    const [startLong, setStartLong] = useState(0)
    const [errors, setErrors] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()
        setErrors([])
        dispatch(setFormThunk(false))

        const payload = {
            userId,
            title,
            description,
            danger,
            endDate: new Date(endDate).toISOString(),
            address,
            startLat,
            startLong
        }

        await dispatch(createClockThunk(payload))
            .catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)

            })
        
        await dispatch(getClockThunk(userId))
        
        
    }

    let userId
    if (user){
        userId = user.id
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="clockForm">
                <h2>Create a DeathClock</h2>
                <p>The clock is created and activated on form submission. Please cancel
                    the clock as soon as you are being safe again. On running down to 0,
                    your friends will be notified and (in development) your mom will be called.
                </p>
                <ul>
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                </ul>
                <label>Title</label>
                <input
                    className="clockFormInput"
                    type="text"
                    placeholder="Title your adventure."
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                >
                </input>
                <label>Description</label>
                <textarea
                    className="clockFormInput"
                    type="textarea"
                    placeholder="Describe your adventure. Be specific, in case of trouble."
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <label>Risk Involved</label>
                <select
                    className="clockFormInput"
                    onChange={e => setDanger(e.target.value)}
                    value={danger}
                >
                    <option value='1'>1 - Light Risk</option>
                    <option value='2'>2 - Mom Wouldn't Like It</option>
                    <option value='3'>3 - Definite Risk</option>
                    <option value='4'>4 - Entering the Danger Zone</option>
                    <option value='5'>5 - I am Danger</option>
                </select>
                <label>What time should you be done?</label>
                <input 
                    className="clockFormInput"
                    type="datetime-local" 
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    required
                >
                </input>
                <label>Optional Address</label>
                <input
                    className="clockFormInput"
                    type="text"
                    placeholder="(Optional) List an address for your adventure."
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                >
                </input>
                <label>Optional Starting Latitude</label>
                <input
                    className="clockFormInput"
                    type="number"
                    step=".00001"
                    placeholder="(Optional) Starting latitude."
                    value={startLat}
                    onChange={e => setStartLat(e.target.value)}
                >
                </input>
                <label>Optional Starting Longitude</label>
                <input
                    className="clockFormInput"
                    type="number"
                    step=".00001"
                    placeholder="(Optional) Starting longitude."
                    value={startLong}
                    onChange={e => setStartLong(e.target.value)}
                >
                </input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateClockForm