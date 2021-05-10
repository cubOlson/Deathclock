import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUserThunk, unfollowUserThunk } from '../../store/user'

function SingleUser(props){
    const dispatch = useDispatch()
    const user = props.user;
    const currentUser = useSelector(state => state.session.user)

    const check = currentUser.followers.includes(user.id)

    const handleAddFollow = async (e, user) => {
        console.log('Added')
        await dispatch(followUserThunk(user.id))
        window.location.reload()
    }

    const handleRemoveFollow = async (e, user) => {
        console.log('Removed')
        await dispatch(unfollowUserThunk(user.id))
        window.location.reload()
    }

    return (
        <div>
            <p>{user.username}</p>
            <p>{user.bio}</p>
            {!check ?
                <button onClick={e => handleAddFollow(e, user)}>Follow User</button>
            : <button onClick={e => handleRemoveFollow(e, user)}>Unfollow User</button>}
        </div>
    )
}

export default SingleUser