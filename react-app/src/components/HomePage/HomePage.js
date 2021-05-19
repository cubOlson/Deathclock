import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClockForm from '../ClockForm/ClockForm'
import Clock from '../Clock/clock'
import FClocksBox from '../FClocksBox/FClocksBox'
import { getClockThunk } from '../../store/clock'
import { setFormThunk, getFormThunk } from '../../store/form'

import './HomePage.css'

import AngelList from '../../images/ANGELLISTLOGO.png'
import GitHub from '../../images/GITHUBLOGO.png'
import LinkedIn from '../../images/LINKEDINLOGO.png'


function Home(){
    const dispatch = useDispatch()
    const clock = useSelector(state => state.clock)
    const user = useSelector(state => state.session.user)
    const form = useSelector(state => state.form)

    let userId
    if (user){
        userId = user.id
    }

    useEffect(() => {
        dispatch(getClockThunk(userId))
    }, [dispatch, userId])

    useEffect(() => {
        dispatch(getFormThunk())
    }, [dispatch, form])

    return (
        <div className="HomePageParent">
            <FClocksBox className="sideBar"/> 
            <div className="mainBox">
                {!clock.id && <button onClick={e => dispatch(setFormThunk(true))}>Create New Clock</button>}
                {clock.id ?
                    <div>
                        <Clock clock={clock}/>
                    </div>
                : <h2>You do not have an active clock.</h2>}
                {(form === true) && <button onClick={e => dispatch(setFormThunk(false))}>Cancel Clock</button>}
                {(form === true) && <ClockForm />}
            </div>
            <div className="myInfoBox">
                <h2>Programmer</h2>
                <h1>Caleb "Cub" Olson</h1>
                <div className="goSideways">
                    <a href="https://github.com/cubOlson" className="infoLogoBox">
                        <img src={GitHub} alt="github" className="myInfoLogos"/>
                        Github
                    </a>
                    <a href="https://www.linkedin.com/in/caleb-olson-86a363ba/" className="infoLogoBox">
                        <img src={LinkedIn} alt="linkedin" className="myInfoLogos"/>
                        LinkedIn
                    </a>
                    <a href="https://angel.co/u/cub-olson" className="infoLogoBox">
                        <img src={AngelList} alt="angellist" className="myInfoLogos"/>
                        AngelList
                    </a>
                </div>
            </div>
        </div>
    )

}

export default Home