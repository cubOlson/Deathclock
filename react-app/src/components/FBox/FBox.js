import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import clockImage from '../../images/ClockTimer.gif'

import './FBox.css'

function FBox(props){
    const clock = props.props.clock
    const user = props.props.thisUser

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


    return (
        <div className="FClockParent">
            <div className="FClockTitle">
                {user && <h2>{user.username}</h2>}
                <p>{clock.title}</p>
                <img src={clockImage} className="FClockImage"/>
            </div>
            <div className="FClockInfo">
                <p>{timeLeft.days} :</p>
                <p> {timeLeft.hours} :</p>
                <p> {timeLeft.minutes} :</p>
                <p> {timeLeft.seconds}</p>
            </div>
        </div>
    )
}

export default FBox