import { Avatar, Button, Menu, MenuItem, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css'
import Createquery from './Createquery';
import Fetchquries from './Fetchquries';
import FetchSinglequery from './FetchSinglequery';
import { useEffect } from 'react';






const Main = ({ userDetails }) => {

    const [pageTitle, setPageTitle] = useState('My Quries');
    const [selectedQN, setSelectedQN] = useState('')


    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        window.localStorage.clear();
        navigate('/login');
    }

    const createquery = () => {
        navigate('/create-query')
        setPageTitle('Create Query');
    }

    const handleBack = () => {
        setPageTitle('My Quries')
        setSelectedQN('')
        navigate(-1)

    }

    const handleSingleQuery = (qn) => {
        setPageTitle('Query')
        setSelectedQN(qn)
        navigate('/query')
    }
    useEffect(() => {
        if (!userDetails) {
            navigate('/login')
        }

    }, [])





    return (
        (userDetails) ?
            <>
                <div className='mainContainer'>
                    <div className="mainHeader">
                        <div className="headName">
                            <h1>{pageTitle}</h1>
                        </div>
                        <div className="userDisplay">

                            <h3>{userDetails.username}</h3>
                            <Button aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}><Avatar /></Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </Menu>

                        </div>
                    </div>
                    {
                        pageTitle === 'My Quries' ? <>
                            <div className="mainContent">
                                <div className="mainContentHead">
                                    <Button onClick={createquery}
                                        variant="contained"
                                        color="success"><AddIcon /> Create qurey</Button>


                                </div>
                                <div className="mainContentDisplay">
                                    <Fetchquries handleSingleQuery={handleSingleQuery} />
                                </div>

                            </div>

                        </> : (pageTitle === 'Query') ?

                            <>
                                <div className="mainContent">
                                    <div className="mainContentHead">
                                        <Button onClick={handleBack}
                                            variant="contained" color="success"><ArrowBackIosIcon />Back</Button>
                                    </div>
                                    <FetchSinglequery selectedQN={selectedQN} />
                                </div>
                            </> :
                            <>
                                <div className="mainContent">
                                    <div className="mainContentHead">
                                        <Button onClick={handleBack}
                                            variant="contained" color="success"><ArrowBackIosIcon />Back</Button>


                                    </div>
                                    <Createquery handleBack={handleBack} />
                                </div>

                            </>

                    }




                    {


                    }



                </div></> :
            <>
            </>


    )
}

export default Main
