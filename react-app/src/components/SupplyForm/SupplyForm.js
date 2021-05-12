import React, { useState } from 'react'
import { setSupplyThunk } from '../../store/supply'
import { getClockThunk } from '../../store/clock'
import { setFormThunk, getFormThunk } from '../../store/form'
import { useDispatch, useSelector } from 'react-redux'

import './ClockForm.css'

function CreateSupplyForm(props){
    const clock = props.clock
    const user = useSelector(state => state.session.user)
    const form = useSelector(state => state.form)

    const [food, setFood] = useState("")
    const [water, setWater] = useState("")
    const [temp, setTemp] = useState("")
    const [shelter, setShelter] = useState("")
    const [tools, setTools] = useState("")
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setErrors([])
        const payload = {
            clockId: clock.id,
            food,
            water,
            temp,
            shelter,
            tools
        }

        dispatch(setFormThunk(false))
        dispatch(getFormThunk())

        await dispatch(setSupplyThunk(payload))
            .catch(async (res) => {
                console.log('---------------', res)
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)

            })  
            
        await dispatch(getClockThunk(user.id))
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="clockForm">
                <h2>Add Supplies</h2>
                <p> All fields are optional, but will help your friends in case of emergency.</p>
                <ul>
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                </ul>
                <input
                    className="clockFormInput"
                    type="text"
                    placeholder="How long will your food last?"
                    value={food}
                    onChange={e => setFood(e.target.value)}
                >
                </input>
                <input
                    className="clockFormInput"
                    type="text"
                    placeholder="How long will your water last?"
                    value={water}
                    onChange={e => setWater(e.target.value)}
                >
                </input>
                <input
                    className="clockFormInput"
                    type="text"
                    placeholder="What temperature range are you dressed for?"
                    value={temp}
                    onChange={e => setTemp(e.target.value)}
                >
                </input>
                <input
                    className="clockFormInput"
                    type="text"
                    placeholder="Do you have access to shelter?"
                    value={shelter}
                    onChange={e => setShelter(e.target.value)}
                >
                </input>
                <textarea
                    className="clockFormInput"
                    placeholder="Do you have tools to help you?"
                    value={tools}
                    onChange={e => setTools(e.target.value)}
                >
                </textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateSupplyForm