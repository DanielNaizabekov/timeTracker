import { createStore } from 'vuex'
import record from './modules/record'

export default createStore({
  modules: {
    record,
  },
})
