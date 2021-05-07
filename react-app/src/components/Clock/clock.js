import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteClockThunk } from '../../store/clock'

import './clock.css'

function Clock(props){
    const dispatch = useDispatch()
    const clock = props.clock;

    
    const calculateTimeLeft = () => {
        let endTime = +new Date(clock.endDate)
        let now = +new Date()
        const difference = endTime - now
        let timeLeft = {}

        if (difference > 0) {
            timeLeft = {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60)
          };
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

    const deleteClock = (e) => {
        e.preventDefault()
        dispatch(deleteClockThunk(clock.id))
    }

    return (
        <div className="componentParent">
            {clock ?
                <div className="clockParent">
                    <div className="clockTitle">
                        <h2>{clock.title}</h2>
                    </div>
                    <div className="timerParent">
                        <div className="timerBox">
                            <div className="titleBox">
                                <p>days</p>
                            </div>
                            <div className="numberBox">
                                <h1>{timeLeft.days}</h1>
                            </div>
                        </div>
                        <div className="timerBox">
                            <div className="titleBox">
                                <p>hours</p>
                            </div>
                            <div className="numberBox">
                                <h1>{timeLeft.hours}</h1>
                            </div>
                        </div>
                        <div className="timerBox">
                            <div className="titleBox">
                                <p>min</p>
                            </div>
                            <div className="numberBox">
                                <h1>{timeLeft.minutes}</h1>
                            </div>
                        </div>
                        <div className="timerBox">
                            <div className="titleBox">
                                <p>sec</p>
                            </div>
                            <div className="numberBox">
                                <h1>{timeLeft.seconds}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="tagParent">
                        <p>Tags</p>
                    </div>
                    <button onClick={e => deleteClock(e)}>Cancel Clock</button>
                </div>
            : null}
        </div>
    )
}

export default Clock
