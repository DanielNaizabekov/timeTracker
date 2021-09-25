import axios from 'axios'

const baseURL = 'https://cryptic-wildwood-33651.herokuapp.com'
// const baseURL = 'https://us-central1-time-tracker-ec74e.cloudfunctions.net/api'
// const baseURL = 'http://localhost:3000'

export const api = axios.create({
  baseURL,
})
