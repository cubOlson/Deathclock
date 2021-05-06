import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClockThunk } from '../../store/clock'

function Clock(){
    const dispatch = useDispatch()
    const clock = useSelector(state => state.clock)
    const user = useSelector(state => state.session.user)

    let userId
    if (user){
        userId = user.id
    }

    const calculateTimeLeft = () => {
        let now = new Date()
        console.log(now)
        console.log(clock.endDate)
    }
    if (clock) {
        calculateTimeLeft()
    }

    useEffect(() => {
        dispatch(getClockThunk(userId))
    }, [dispatch])

    return (
        <div>
            {clock ?
                <div>
                    <p>{clock.title}</p>
                    <p>{clock.endDate}</p>
                </div>
            : null}
        </div>
    )
}

export default Clock
