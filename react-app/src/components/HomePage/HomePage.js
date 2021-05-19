import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClockForm from '../ClockForm/ClockForm'
import Clock from '../Clock/clock'
import FClocksBox from '../FClocksBox/FClocksBox'
import { getClockThunk } from '../../store/clock'
import { setFormThunk, getFormThunk } from '../../store/form'

import './HomePage.css'

function Home(){
    const dispatch = useDispatch()
    const clock = useSelector(state => state.clock)
    const user = useSelector(state => state.session.user)
    const form = useSelector(state => state.form)

    let userId
    if (user){
        userId = user.id
    }

    useEffect(() => {
        dispatch(getClockThunk(userId))
    }, [dispatch, userId])

    useEffect(() => {
        dispatch(getFormThunk())
    }, [dispatch, form])

    return (
        <div className="HomePageParent">
            <FClocksBox className="sideBar"/> 
            <div className="mainBox">
                {!clock.id && <button onClick={e => dispatch(setFormThunk(true))}>Create New Clock</button>}
                {clock.id ?
                    <div>
                        <Clock clock={clock}/>
                    </div>
                : <h2>You do not have an active clock.</h2>}
                {(form === true) && <button onClick={e => dispatch(setFormThunk(false))}>Cancel Clock</button>}
                {(form === true) && <ClockForm />}
            </div>
            <div className="myInfoBox">
                <h2>Programmer</h2>
                <h1>Caleb "Cub" Olson</h1>
                <div>
                    <a href="https://github.com/cubOlson">Github</a>
                </div>
                <div>
                    <a href="https://www.linkedin.com/in/caleb-olson-86a363ba/">LinkedIn</a>
                </div>
                <div>
                    <a href="https://angel.co/u/cub-olson">AngelList</a>
                </div>
            </div>
        </div>
    )

}

export default Home