import axios from 'axios'
import axiosRateLimit from 'axios-rate-limit'

const printful = axiosRateLimit(axios.create({
    baseURL:'https://api.printful.com',
}),{
    maxRequests:100,
    perMilliseconds:1000
})

export default printful