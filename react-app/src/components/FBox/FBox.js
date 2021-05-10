import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function FBox(props){
    const clock = props.clock


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
        <div>
            <p>{clock.title}</p>
            <p>{timeLeft.days}</p>
            <p>{timeLeft.hours}</p>
            <p>{timeLeft.minutes}</p>
            <p>{timeLeft.seconds}</p>
        </div>
    )
}

export default FBox