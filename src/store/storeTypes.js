const actions = {
  GET_RECORDS: 'GET_RECORDS',
  GET_RECORD_BY_ID: 'GET_RECORD_BY_ID',
  CREATE_RECORD: 'CREATE_RECORD',
  UPDATE_RECORD: 'UPDATE_RECORD',
  DELETE_RECORD: 'DELETE_RECORD',
}

const mutations = {
  SET_RECORDS: 'SET_RECORDS',
}

const getters = {
  records: 'records',
}

export const storeTypes = {
  ...actions,
  ...mutations,
  ...getters,
}
