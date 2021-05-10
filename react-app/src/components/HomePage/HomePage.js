import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClockForm from '../ClockForm/ClockForm'
import Clock from '../Clock/clock'
import { getClockThunk } from '../../store/clock'
import { setFormThunk, getFormThunk } from '../../store/form'

function Home(){
    const dispatch = useDispatch()
    const clock = useSelector(state => state.clock)
    const user = useSelector(state => state.session.user)
    const form = useSelector(state => state.form)

    console.log(clock)

    let userId
    if (user){
        userId = user.id
    }

    useEffect(() => {
        dispatch(getClockThunk(userId))
    }, [dispatch])

    useEffect(() => {
        dispatch(getFormThunk())
    }, [dispatch, form])

    return (
        <div>
            {clock.id ?
                <div>
                    <Clock clock={clock}/>
                </div>
            : null}
            {!clock.id && <button onClick={e => dispatch(setFormThunk(true))}>Create New Clock</button>}
            {(form === true) && <button onClick={e => dispatch(setFormThunk(false))}>Cancel Clock</button>}
            {(form === true) && <ClockForm />}
        </div>
    )

}

export default Home