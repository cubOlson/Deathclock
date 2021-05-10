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

    let userBox = users.filter(user => user.id !== currentUser.id)
                       .filter(user => !currentUser.followers.includes(user.id))
                       .map(user => {
                           return (
                               <div>
                                   {user ?
                                       <SingleUser user={user} />
                                   : null}
                               </div>
                           )
                       })

    let followBox = users.filter(user => currentUser.followers.includes(user.id))
                         .map(user => {
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
            {users.length > 0 ?
            <div>
                <div>
                    <p>Followed Users</p>
                    {followBox}
                </div>
                <div>
                    <p>All Users</p>
                    {userBox}
                </div>
            </div>
            : null}
        </div>
    )
}

export default UserFollow