import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUserThunk, unfollowUserThunk } from '../../store/user'

function SingleUser(props){
    const dispatch = useDispatch()

    const handleAddFollow = async (e, user) => {
        console.log('Hey')
        dispatch(followUserThunk(user.id))
    }

    const handleRemoveFollow = async (e, user) => {
        console.log('Hey it"s Remove')
        dispatch(unfollowUserThunk(user.id))
    }

    return (
        <div>
            <p>{props.user.username}</p>
            <button onClick={e => handleAddFollow(e, props.user)}>Follow User</button>
            <button onClick={e => handleRemoveFollow(e, props.user)}>Unfollow User</button>
        </div>
    )
}

export default SingleUser