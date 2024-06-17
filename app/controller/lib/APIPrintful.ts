import axios from 'axios'
import axiosRateLimit from 'axios-rate-limit'

const APIPrintful = axiosRateLimit(axios.create({
    baseURL:'/api/printful',
}),{
    maxRequests:100,
    perMilliseconds:1000
})

export default APIPrintful