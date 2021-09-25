import moment from 'moment'

export const dateFormat = value => {
  if (!value) {
    return true
  }

  return moment(value, 'YYYY/MM/DD', true).isValid()
}
