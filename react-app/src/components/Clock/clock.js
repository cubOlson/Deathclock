import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClockThunk, deleteClockThunk } from '../../store/clock'
import { setFormThunk, getFormThunk } from '../../store/form'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import SupplyForm from '../SupplyForm/SupplyForm'

import './clock.css'
import clockImage from '../../images/ClockTimer.gif'
import alarmImage from '../../images/ALARM.gif'

function Clock(props){
    const dispatch = useDispatch()
    const clock = props.clock;
    const user = useSelector(state => state.session.user)
    const form = useSelector(state => state.form)

    const [selected, setSelected] = useState({})

    const [theImage, setTheImage] = useState(clockImage)
    
    let userId
    if (user) userId = user.id

    const fixNumber = (val) => {
        if(val < 10){
            return `0${val}`
        }
        return val
    }
    
    const calculateTimeLeft = useCallback(() => {
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

            if (theImage !== alarmImage) setTheImage(alarmImage)
     
                const heyo = document.getElementById('userClock')
                if (heyo) heyo.className = 'FlashTimerParent'

        }
        return timeLeft;
    }, [clock.endDate, theImage])

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, calculateTimeLeft])

    useEffect(() => {
        dispatch(getFormThunk())
    }, [dispatch, form])

    const deleteClock = async (e) => {
        e.preventDefault()
        await dispatch(deleteClockThunk(clock.id))
        await dispatch(getClockThunk(userId))
    }

    let location = null;
    if (clock && user) {
        if (clock.startLat !== 0 || clock.startLong !== 0) {
        location = {
            lat: clock.startLat,
            lng: clock.startLong
        }
    }
    }

    const mapStyles = {
        height: "200px",
        width: "100%",
    };
    
    const defaultCenter = {
        lat: 42.434719, lng: -83.985001
    }
    

    return (
        <div className="componentParent">
            {clock ?
                <div className="clockParent">
                    <div className="timerParent" id = "userClock">
                        <img src={theImage} alt="Clock GIF" className="clockImage"/>
                        <div className="titleFix">
                            <div className="titleFixTitle">
                                <h1>{clock.title}</h1>
                            </div>
                            <div className="timerFix">
                                <div className="timerBox">
                                    <div className="titleBox">
                                        <p>days</p>
                                    </div>
                                    <div className="numberBox">
                                        <h1>{fixNumber(timeLeft.days)}</h1>
                                    </div>
                                </div>
                                <div className="spacer">:</div>
                                <div className="timerBox">
                                    <div className="titleBox">
                                        <p>hours</p>
                                    </div>
                                    <div className="numberBox">
                                        <h1>{fixNumber(timeLeft.hours)}</h1>
                                    </div>
                                </div>
                                <div className="spacer">:</div>
                                <div className="timerBox">
                                    <div className="titleBox">
                                        <p>min</p>
                                    </div>
                                    <div className="numberBox">
                                        <h1>{fixNumber(timeLeft.minutes)}</h1>
                                    </div>
                                </div>
                                <div className="spacer">:</div>
                                <div className="timerBox">
                                    <div className="titleBox">
                                        <p>sec</p>
                                    </div>
                                    <div className="numberBox">
                                        <h1>{fixNumber(timeLeft.seconds)}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="clockInfoBox">
                            <div>Info:
                                <div className="clockDescription">{clock.description}</div>
                            </div>
                            <p>Address: {clock.address}</p>
                        </div>
                    </div>
                    {location ? 
                        <LoadScript
                            googleMapsApiKey='something'>
                            <GoogleMap
                                mapContainerStyle={mapStyles}
                                zoom={5}
                                center={location ?
                                  location
                                : defaultCenter}
                            >
                                <Marker key={user.username} position={location} onClick={() => setSelected(clock)} />
                                {selected.id &&
                                  (
                                    <InfoWindow
                                      position={location}
                                      clickable={true}
                                      onCloseClick={() => setSelected({})}
                                    >
                                      <div>
                                        <p>{user.username}</p>
                                        <p>{selected.title}</p>
                                      </div>
                                    </InfoWindow>
                                  )
                                }
                            </GoogleMap>

                        </LoadScript>
                    : <h2>No coordinates were provided.</h2>}
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
                    {(form === 'addSupplies' && clock.userId === user.id) && <button onClick={e => dispatch(setFormThunk(false))}>Cancel Supplies</button>}
                    <div id="clockButtons">
                        {(form !== 'addSupplies' && clock.userId === user.id) && <button onClick={e => dispatch(setFormThunk('addSupplies'))}>Add Supplies</button>}
                        {(clock.userId === user.id) && <button onClick={e => deleteClock(e)}>Cancel Clock</button>}
                    </div>
                    {(form === 'addSupplies') && <SupplyForm clock={clock}/>}
                </div>
            : null}
        </div>
    )
}

export default Clock
