import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

function CreateClockForm(){
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [danger, setDanger] = useState(0)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [address, setAddress] = useState("")
    const [startLat, setStartLat] = useState("")
    const [startLong, setStartLong] = useState("")
    const [endLat, setEndLat] = useState("")
    const [endLong, setEndLong] = useState("")

    function handleSubmit(){
        return
    }

    let userId
    if (user){
        userId = user.id
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                
            </form>
        </div>
    )
}