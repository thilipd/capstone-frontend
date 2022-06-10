import { Button } from '@mui/material';
import React from 'react'
import LiveHelpIcon from '@mui/icons-material/LiveHelp';


const Sidebar = ({ userDetails }) => {

    return (

        (userDetails) ? <>
            <div className='sidebar'>

                <div className="sidebarContainer">
                    <h1>{userDetails.role}</h1>
                </div>
                <div className='sidebarContent'>
                    <ul>
                        <li><Button variant="contained"

                            color={"primary"}><LiveHelpIcon />Queries</Button></li>
                    </ul>
                </div>


            </div>
        </> : <></>

    )
}

export default Sidebar
