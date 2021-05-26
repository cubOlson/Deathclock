import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../store/user'
import { getNonFollowersThunk } from '../../store/follows'
import SingleUser from '../SingleUser/SingleUser'

import './UserFollow.css'

function UserFollow() {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)
    const nonfollowers = Object.values(useSelector(state => state.followers))

    console.log('NOTFOLLOWING', nonfollowers)
    console.log('FOLLOWERS', currentUser.follows)


    let userBox = nonfollowers.map(user => {
        return (
            <div>
                {user ?
                    <SingleUser user={user} />
                : null}
            </div>
        )
    })


                         
    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getNonFollowersThunk())
    }, [dispatch])
    
    
    return (
        <div>
            <div className="allUserBox">
                {nonfollowers.length > 0 ?
                    <div className="filteredUserBox">
                        <h1>All Users</h1>
                        {userBox}
                    </div>
                : <p className="filteredUserBox">You are following all current users! Congrats.</p>}
            </div>
        </div>
    )
}

export default UserFollow