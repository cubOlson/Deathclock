import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../store/user'
import SingleUser from '../SingleUser/SingleUser'

function UserFollow() {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)
    const users = Object.values(useSelector(state => state.users))

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    let userBox = users.map(user => {
        return (
            <div>
                {user ?
                    <SingleUser user={user} />
                : null}
            </div>
        )
    })

    return (
        <div>
            {users.length > 1 ?
            <div>
                <p>{currentUser.username}</p>
                {userBox}
            </div>
            : null}
        </div>
    )
}

export default UserFollow