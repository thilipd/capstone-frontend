import React from 'react';
import Sidebar from './Sidebar';
import Main from './Main';


const Home = () => {

    const userDetails = JSON.parse(window.localStorage.getItem('logged_User'))

    return (
        <div className='appContainer'>


            <>
                <Sidebar userDetails={userDetails} />
                <Main userDetails={userDetails} />
            </>

        </div>
    )
}

export default Home
