import axios from 'axios'

export default axios.create({
    baseURL: 'https://blogpoint-server.grouppoint.online/',
    // baseURL: 'http://localhost:3000',
})