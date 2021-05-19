import React, { useCallback, useEffect, useState } from 'react';

import clockImage from '../../images/ClockTimer.gif'
import alarmImage from '../../images/ALARM.gif'

import './FBox.css'

function FBox(props){
    const clock = props.props.clock
    const user = props.props.thisUser

    const [theImage, setTheImage] = useState(clockImage)

    const calculateTimeLeft = useCallback(() => {
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
        } else {
            timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
            setTheImage(alarmImage)

            if(user){
                const heyo = document.getElementById(user.username)
                if (heyo) heyo.className = 'FlashFClockParent'
            }
        }
        return timeLeft;
    }, [clock.endDate, user])

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, calculateTimeLeft])


    return (
        <div>
            {user ?
            <a href={`/users/${user.id}`}>
                <div className="FClockParent" id={user.username}>
                    <div className="FClockTitle">
                        {user && <h2>{user.username}</h2>}
                        <p>{clock.title}</p>
                        <img src={theImage} alt="Clock GIF" className="FClockImage"/>
                    </div>
                    <div className="FClockInfo">
                        <p>{timeLeft.days} :</p>
                        <p> {timeLeft.hours} :</p>
                        <p> {timeLeft.minutes} :</p>
                        <p> {timeLeft.seconds}</p>
                    </div>
                </div>
            </a>
            : <p>Loading...</p>}
        </div>
    )
}

export default FBox