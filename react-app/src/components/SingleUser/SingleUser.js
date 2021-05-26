import React from 'react';
import { useDispatch } from 'react-redux';
import { followUserThunk } from '../../store/user'
import { getNonFollowersThunk } from '../../store/follows'
import { getFriendClocksThunk } from '../../store/friendClocks'

import './SingleUser.css'

function SingleUser(props){
    const dispatch = useDispatch()
    const user = props.user;

    const handleAddFollow = async (e) => {
        await dispatch(followUserThunk(user.id))
        await dispatch(getNonFollowersThunk())
        await dispatch(getFriendClocksThunk())
    }

    return (
        <div className="singleUserBox">
            <div>
                <h2>{user.username}</h2>
                <p>{user.bio}</p>
            </div>
            <button onClick={e => handleAddFollow(e)}>Follow User</button>
        </div>
    )
}

export default SingleUser