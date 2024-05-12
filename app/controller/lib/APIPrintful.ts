import axios from 'axios'

const APIPrintful = axios.create({
    baseURL:'/api/printful',
})

export default APIPrintful