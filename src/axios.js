
import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://106.201.161.43:9000'
})

export default instance;



