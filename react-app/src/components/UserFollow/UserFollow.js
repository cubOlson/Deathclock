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
            <div key={user.id}>
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
        <div id="searchContainer">
            <div id="searchedUserBoxContainer">
                <h1>Add Users</h1>
                <label>Filter Users</label>
                <input
                    type="text"
                    placeholder="Search by username"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                >
                </input>
                {nonfollowers.length > 0 ?
                    <div id="searchedUserBox">
                        {userBox}
                    </div>
                : <p>You are following all current users! Congrats.</p>}
            </div>
        </div>
    )
}

export default UserFollow