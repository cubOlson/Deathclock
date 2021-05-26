import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../store/user'
import { getNonFollowersThunk } from '../../store/follows'
import SingleUser from '../SingleUser/SingleUser'

import './UserFollow.css'

function UserFollow() {
    const dispatch = useDispatch()
    const nonfollowers = Object.values(useSelector(state => state.followers))

    const [search, setSearch] = useState("")

    let userBox = nonfollowers.filter(user => user.username.toLowerCase().includes(search.toLowerCase())).map(user => {
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
            <input
                type="text"
                placeholder="Search by username"
                value={search}
                onChange={e => setSearch(e.target.value)}
            >
            
            </input>
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