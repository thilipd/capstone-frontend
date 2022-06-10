import React, { useEffect, useState } from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';
import axios from './axios';
import { useNavigate } from 'react-router-dom';

// import Fileupload from './Fileupload';
// import { Button } from 'bootstrap';


const Createquery = ({ handleBack }) => {

    const navigate = useNavigate();

    const topicArray = [
        { id: 1, topic: 'Class doubt' },
        { id: 2, topic: 'Placement related' },
        { id: 3, topic: 'Coordination related' },
    ]

    const subTopicArray = [
        { id: 1, topicId: 1, sub: 'Task' },
        { id: 2, topicId: 1, sub: 'Hackathon' },
        { id: 3, topicId: 1, sub: 'Class topic' },
        { id: 4, topicId: 3, sub: 'Session timing' },
        { id: 5, topicId: 3, sub: 'Session Joining link' },
        { id: 6, topicId: 3, sub: 'Session feedback' },
        { id: 7, topicId: 3, sub: 'Completion certificate' },
        { id: 8, topicId: 3, sub: 'Payment' },

    ];


    const languages = ['English', 'Tamil', 'Hindi'];
    const format = ' hh:mm a';

    const loggedUser = JSON.parse(window.localStorage.getItem('logged_User'));

    const usermail = loggedUser.email;

    const [topics, setTopics] = useState([]);
    const [subTopics, setSubtopics] = useState([]);


    const [formValues, setFormValues] = useState({
        topic: '',
        subTopic: '',
        language: '',
        queryTitle: '',
        description: '',
        availableTime: []

    })


    useEffect(() => {
        setTopics(topicArray)

    }, []);

    const handleTopic = (e) => {
        const id = e.target.value;

        const data = subTopicArray.filter(x => (x.topicId == id));
        setSubtopics(data);

        topicArray.forEach((val) => {
            if (val.id == id) {
                setFormValues({ ...formValues, topic: val.topic });

            }
        })

    }

    const handeSubTopic = (e) => {
        const id = e.target.value;
        subTopicArray.forEach((val) => {
            if (val.id == id) {
                setFormValues({ ...formValues, subTopic: val.sub });

            }
        })
    }

    const handleLanguage = (e) => {
        let index = (e.target.value - 1);
        setFormValues({ ...formValues, language: languages[index] });

    }

    const handleQueryTitle = (e) => {
        const value = e.target.value;
        setFormValues({ ...formValues, queryTitle: value });

    }

    const handleDescription = (e) => {
        const value = e.target.value;
        setFormValues({ ...formValues, description: value });
    }

    const selectedTime = (time, timeString) => {
        setFormValues({ ...formValues, availableTime: timeString });
    }




    const handleSubmit = async (e) => {
        e.preventDefault();




        const now = new Date();

        const [date, month, year, hours, min] = [now.getDate(), now.getMonth(), now.getFullYear(), now.getHours(), now.getMinutes()];

        console.log(`Date - ${date.toString().padStart(2, 0)}:${month}:${year}, time-${hours}:${min}`);

        const createdDate = `${date.toString().padStart(2, 0)}/${month.toString().padStart(2, 0)}/${year}`;
        const createdTime = `${hours.toString().padStart(2, 0)}:${min.toString().padStart(2, 0)}`

        if (!formValues.topic ||
            !formValues.language ||
            !formValues.description ||
            formValues.availableTime.length !== 2) {

            alert('Please fill all the feilds');

        }

        if (formValues.topic &&
            formValues.language &&
            formValues.description &&
            formValues.availableTime.length === 2) {

            await axios.post('/query/create', {
                ...formValues,
                usermail: usermail,
                createdDate: createdDate,
                createdTime: createdTime
            });

            console.log('submit');

            setFormValues({
                topic: '',
                subTopic: '',
                language: '',
                queryTitle: '',
                description: '',
                availableTime: []

            });
            setTopics([]);
            setSubtopics([]);

            handleBack();
        }


    }




    return (
        <div className='createQueryContainer'><br /><br /><br /><br />
            <form className='queryForm' onSubmit={handleSubmit}>
                <div className="topic" >
                    <h3>Topic</h3>

                    <select className='topic' onChange={handleTopic} required>
                        <option value={0}>---Select Topic---</option>
                        {
                            topics && topics !== undefined ?
                                topics.map((val) => {
                                    return <option key={val.id} value={val.id}>{val.topic}</option>
                                }) : "no topic"
                        }

                    </select><br /><br />

                    {
                        (subTopics && subTopics !== undefined && subTopics.length !== 0) ? <>
                            <select className='subtopic' onChange={handeSubTopic} required>
                                <option value={0}>---Select Sub-topic---</option>
                                {

                                    subTopics.map((val) => {
                                        return <option key={val.id} value={val.id}>{val.sub}</option>
                                    })

                                }

                            </select><br /><br /></> :
                            <></>
                    }

                    <select className='language' onChange={handleLanguage} required>
                        <option value={0} >---Select Language---</option>
                        {
                            languages.map((val, i) => {
                                return <option key={`${i + 1}`} value={`${i + 1}`}>{val}</option>
                            })
                        }
                    </select>

                </div>
                <div className="details">
                    <h3>Details</h3>
                    <label name="queryTitle" >Query Title<br />

                        <input type={'text'}
                            name='queryTitle'
                            className='queryTitle'
                            placeholder='---Enter the query title---'
                            value={formValues.queryTitle}
                            onChange={handleQueryTitle} required />

                    </label><br /><br />
                    <label name="queryDescription" >Description<br />

                        <textarea name='queryDescription'
                            className='queryDescription'
                            placeholder='---Enter the Description---'
                            value={formValues.description}
                            onChange={handleDescription} required />

                    </label><br /><br />

                </div>
                <div className="availableTime" >

                    <label name="availableTime" >Available Time<br />

                        <TimePicker.RangePicker className="availableTime"
                            defaultValue={moment('09:00', format)}
                            format={format}
                            onChange={selectedTime}
                            required />

                    </label><br /><br />
                    <br /><br />
                </div>
                {/* <div className="attachment">
                    <h3>Attachments</h3>
                    <Fileupload handleAttachment={handleAttachment} />

                </div> */}

                <input type={'submit'} value={'submit'} />
            </form>

        </div>
    )
}

export default Createquery
