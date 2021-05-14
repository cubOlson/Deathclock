import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClockThunk, deleteClockThunk } from '../../store/clock'
import { setFormThunk, getFormThunk } from '../../store/form'
import SupplyForm from '../SupplyForm/SupplyForm'

import './clock.css'
import clockImage from '../../images/ClockTimer.gif'
import alarmImage from '../../images/ALARM.gif'

function Clock(props){
    const dispatch = useDispatch()
    const clock = props.clock;
    const user = useSelector(state => state.session.user)
    const form = useSelector(state => state.form)
    
    let userId
    if (user) userId = user.id

    let theImage = clockImage
    
    const calculateTimeLeft = () => {
        let endTime = new Date(clock.endDate)
        let now = new Date()
        const difference = endTime - now
        let timeLeft = {}

        if (difference > 0) {
            timeLeft = {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60)
          };
        } else {
            timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
            theImage = alarmImage;
        }
        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft])

    useEffect(() => {
        dispatch(getFormThunk())
    }, [dispatch, form])

    const deleteClock = async (e) => {
        e.preventDefault()
        await dispatch(deleteClockThunk(clock.id))
        await dispatch(getClockThunk(userId))
    }

    return (
        <div className="componentParent">
            {clock ?
                <div className="clockParent">
                    <div className="timerParent">
                        <img src={theImage} className="clockImage"/>
                        <div className="titleFix">
                            <h1>{clock.title}</h1>
                            <div className="timerFix">
                                <div className="timerBox">
                                    <div className="titleBox">
                                        <p>days</p>
                                    </div>
                                    <div className="numberBox">
                                        <h1>{timeLeft.days}</h1>
                                    </div>
                                </div>
                                <div className="spacer">:</div>
                                <div className="timerBox">
                                    <div className="titleBox">
                                        <p>hours</p>
                                    </div>
                                    <div className="numberBox">
                                        <h1>{timeLeft.hours}</h1>
                                    </div>
                                </div>
                                <div className="spacer">:</div>
                                <div className="timerBox">
                                    <div className="titleBox">
                                        <p>min</p>
                                    </div>
                                    <div className="numberBox">
                                        <h1>{timeLeft.minutes}</h1>
                                    </div>
                                </div>
                                <div className="spacer">:</div>
                                <div className="timerBox">
                                    <div className="titleBox">
                                        <p>sec</p>
                                    </div>
                                    <div className="numberBox">
                                        <h1>{timeLeft.seconds}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="clockInfoBox">
                            <p>Info:</p>
                            <div className="clockDescription">{clock.description}</div>
                            <p>Address: {clock.address}</p>
                            <p>Start: {clock.startLat}, {clock.startLong}</p>
                            <p>End: {clock.endLat}, {clock.endLong}</p>
                        </div>
                    </div>
                    <div className="tagParent">
                        {clock.supplies.length ?
                            <div>
                                <p>Food: {clock.supplies[0].food}</p>
                                <p>Water: {clock.supplies[0].water}</p>
                                <p>Temperature: {clock.supplies[0].temp}</p>
                                <p>Shelter: {clock.supplies[0].shelter}</p>
                                <p>Tools: {clock.supplies[0].tools}</p>
                            </div>
                        : <p>No Supplies</p>}
                    </div>
                    {(form !== 'addSupplies') && <button onClick={e => dispatch(setFormThunk('addSupplies'))}>Add Supplies</button>}
                    {(form === 'addSupplies') && <button onClick={e => dispatch(setFormThunk(false))}>Cancel Supplies</button>}
                    <button onClick={e => deleteClock(e)}>Cancel Clock</button>
                    {(form === 'addSupplies') && <SupplyForm clock={clock}/>}
                </div>
            : null}
        </div>
    )
}

export default Clock
