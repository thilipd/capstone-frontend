import { Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from './axios';

const FetchSinglequery = ({ selectedQN }) => {

    const [selectedQuery, setSelectedQuery] = useState({});

    useEffect(() => {



        const fetchQuery = async () => {

            await axios.post('/query/singleQueries', {
                queryNo: selectedQN

            }).then((response) => {

                setSelectedQuery({ ...response.data })
            })

        }
        fetchQuery()

    }, []);





    return (
        <div className='singleQueryContainer'>


            <div className="singleQueryPart singleQueryPart1">
                <div className="singleQueryPart1Head">
                    <div>
                        <Chip label={'Closed'} color={'warning'} size={'large'} />
                    </div>
                </div>
                <div className="singleQueryPart1Content">

                </div>

                <div className="singleQueryPart1Foot">
                    <div className='footContainer'>
                        <h2>Solution:</h2>
                        <h4>Clarified in meet</h4>
                        <hr />
                    </div>
                </div>

            </div>

            <div className="singleQueryPart singleQueryPart2">
                <div className="singleQueryPart2Conatiner">

                    <div className="singleQueryHead">
                        <h2> Query</h2>

                        <h3>{selectedQuery.queryNo} ---> {selectedQuery.queryTitle}</h3>
                    </div>
                    <hr align='center' className='horzontalLine' />


                    <div className="singleQueryContent">
                        <div className="singleQueryContentPart">
                            <h4>Created at:</h4>
                            <h3>{selectedQuery.createdDate}  {selectedQuery.createdTime}</h3>
                        </div>
                        <div className="singleQueryContentPart">
                            <h4>Assigned:</h4>
                            <h3>-</h3>
                        </div>
                        <div className="singleQueryContentPart">
                            <h4>Description:</h4>
                            <h3>{selectedQuery.description}</h3>
                        </div>
                        <div className="singleQueryContentPart">
                            <h4>Catagory:</h4>
                            <h3>{selectedQuery.topic} </h3>
                        </div>
                        <div className="singleQueryContentPart">
                            <h4>Sub-catagory:</h4>
                            <h3>{selectedQuery.subTopic ? <>{selectedQuery.subTopic}</> : <>-</>}</h3>
                        </div>
                        <div className="singleQueryContentPart">
                            <h4>Perfered Language:</h4>
                            <h3>{selectedQuery.perferedLanguage}</h3>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default FetchSinglequery
