import axios from 'axios'

const printful = axios.create({
    baseURL:'https://api.printful.com',
})

export default printful