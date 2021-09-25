import moment from 'moment'

import { api } from '@/api'
import { storeTypes } from '../storeTypes'

const stringToMinutes = value => {
  const parts = value.split(' ')
  let minutes = 0

  parts.forEach(part => {
    const splitted = part.split('')
    const type = splitted.pop()
    const value = Number(splitted.join(''))

    if (type === 'h') {
      minutes += value * 60
    } else {
      minutes += value
    }
  })

  return minutes
}

const minutesToString = value => {
  const hours = value / 60
  const rhours = Math.floor(hours)
  const minutes = (hours - rhours) * 60
  const rminutes = Math.round(minutes)

  return `${rhours}h ${rminutes}m`
}

const state = {
  records: [],
}

const getters = {
  [storeTypes.records]: state => state.records.map(record => ({
    ...record,
    date: moment(record.date).format('YYYY/MM/DD'),
    duration: minutesToString(record.duration),
  })),
}

const actions = {
  async [storeTypes.GET_RECORDS] ({ commit }) {
    const { data } = await api.get('/record')

    commit(storeTypes.SET_RECORDS, data)
  },

  async [storeTypes.GET_RECORD_BY_ID] (_, id) {
    const { data } = await api.get(`/record/${id}`)

    return {
      ...data,
      date: moment(data.date).format('YYYY/MM/DD'),
      duration: minutesToString(data.duration),
    }
  },

  async [storeTypes.CREATE_RECORD] ({ dispatch }, data) {
    const response = await api.post('/record', {
      ...data,
      date: moment(data.date),
      duration: stringToMinutes(data.duration),
    })

    dispatch(storeTypes.GET_RECORDS)

    return response
  },
  
  async [storeTypes.UPDATE_RECORD] ({ dispatch }, { id, data }) {
    const response = await api.put(`/record/${id}`, {
      ...data,
      date: moment(data.date),
      duration: stringToMinutes(data.duration),
    })

    dispatch(storeTypes.GET_RECORDS)

    return response
  },
}

const mutations = {
  [storeTypes.SET_RECORDS] (state, value) {
    state.records = value
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
