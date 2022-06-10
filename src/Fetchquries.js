import React, { useEffect, useState } from 'react';
import axios from './axios';
import Chip from '@mui/material/Chip';
import { Button } from '@mui/material';




const Fetchquries = ({ handleSingleQuery }) => {

    const currentStatus = 'closed'

    const loggedUser = JSON.parse(window.localStorage.getItem('logged_User'));

    const usermail = loggedUser.email;

    const [queryArray, setQueryArray] = useState([]);
    const [recentQuery, setRecentQuery] = useState({})


    useEffect(() => {

        const fetchquries = async () => {
            await axios.post('/query/userQueries', {
                usermail: usermail
            }).then((response) => {
                setQueryArray([...response.data]);
            })
        }
        fetchquries();


    }, []);


    useEffect(() => {
        const fetchRecentQuery = (arr) => {
            arr.map((obj, i) => {

                if (i === (arr.length - 1)) {
                    setRecentQuery(obj);
                }
            })
        }
        fetchRecentQuery(queryArray)
    }, [queryArray])


    const handleClick = (qn) => {
        handleSingleQuery(qn);
    }


    return (
        <div className='queriesContainer'>

            <div className="querySection">
                {
                    queryArray.map((query, i) => (
                        <>
                            <div key={i} className="queryContainer" onClick={() => handleClick(query.queryNo)} >
                                <div className="queryContainer1 queryContainerPart">
                                    <h3>{query.queryNo}-{query.queryTitle}</h3>
                                    <Chip label={query.topic} color="primary" />
                                </div>
                                <div className="queryContainerPart queryContainer2">
                                    <Chip className='tag' label={currentStatus} color="warning" />
                                    <h5>Created at: {query.createdDate}  {query.createdTime}</h5>

                                </div>

                            </div>
                        </>
                    ))
                }
            </div>
            <div className="recentQueryContainer">
                <div className="recentQuery">
                    <div className="recentQueryHead">
                        <h2>Recent Query</h2>
                        <div className="subHead">
                            <h3>{recentQuery.queryNo} ---> {recentQuery.queryTitle}</h3>
                            <Chip label={currentStatus} color="warning" />
                        </div>
                        <hr align='center' className='horzontalLine' />

                    </div>
                    <div className="recentQueryContent">
                        <div className="queryContentPart">
                            <h4>Created at:</h4>
                            <h3>{recentQuery.createdDate}  {recentQuery.createdTime}</h3>
                        </div>
                        <div className="queryContentPart">
                            <h4>Assigned:</h4>
                            <h3>-</h3>
                        </div>
                        <div className="queryContentPart">
                            <h4>Description:</h4>
                            <h3>{recentQuery.description}</h3>
                        </div>

                    </div>
                    <Button variant='contained' onClick={() => handleClick(recentQuery.queryNo)}>Go to Query </Button>
                </div>

            </div>

        </div>
    )
}

export default Fetchquries
