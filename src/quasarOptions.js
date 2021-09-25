import './styles/quasar.scss'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

import { Notify } from 'quasar'

export const quasarOptions = {
  components: [],
  config: {
    notify: {
      color: 'blue-grey-10',
      position: 'top-right',
    },
  },
  plugins: { Notify },
}
