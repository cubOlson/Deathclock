import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendClocksThunk } from '../../store/friendClocks'
import FBox from '../FBox/FBox'


function FClocksBox(){
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const friendClocks = useSelector(state => state.friendClock)

    console.log('FRIENDCLOCKS', friendClocks.clocks)
    console.log('FOLLOWERS', user.followers)

    let FriendClockBox = null;
    if (friendClocks.clocks){
        const clocks = friendClocks.clocks.filter(clock => user.followers.includes(clock.userId))
        console.log('CLOCKS', clocks)

        FriendClockBox = clocks.map(clock => {
            return (
                <FBox clock={clock} />
            )
        })
    }

    useEffect(() => {
        dispatch(getFriendClocksThunk())
    }, [dispatch])

    return (
        <div>
            <h1>Hello</h1>
            {FriendClockBox}
        </div>
    )
}

export default FClocksBox