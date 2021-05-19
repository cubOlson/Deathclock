import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendClocksThunk } from '../../store/friendClocks'
import { getAllUsers } from '../../store/user'
import FBox from '../FBox/FBox'

import './FClocksBox.css'


function FClocksBox(){
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const friendClocks = useSelector(state => state.friendClock)
    const allUsers = Object.values(useSelector(state => state.users))

    let FriendClockBox = null;
    if (friendClocks.clocks){
        const clocks = friendClocks.clocks.filter(clock => user.followers.includes(clock.userId))

        FriendClockBox = clocks.map(clock => {
            const thisUser = allUsers.filter(user => user.id === clock.userId)[0]
            const props = {clock, thisUser}
            return (
                <FBox key={user.id} props={props} />
            )
        })
    }

    useEffect(() => {
        dispatch(getFriendClocksThunk())
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <div className="FBoxParent">
            <h1>Active Friends</h1>
            {FriendClockBox}
        </div>
    )
}

export default FClocksBox