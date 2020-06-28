const global = require("../../utils/global")
const state = {
  workingTime: 25 ,// global.getUserConfig().workingTime,
  restTime: 10, //global.getUserConfig().restTime,
  longRestTime: 25,// global.getUserConfig().longRestTime,
  longRestTimeInterval:2 // global.getUserConfig().intervalTimes // 长时间休息间隔数
  
}
const mutations = {
  SET_WORKING_TIME (state, data) {
    state.workingTime = data
  },
  SET_REST_TIME (state, data) {
    state.restTime = data
  },
  SET_LONG_REST_TIME (state, data) {
    state.longRestTime = data
  },
  SET_LONG_REST_TIME_INTERVAL (state, data) {
    state.longRestTimeInterval = data
  }
}
const actions = {
  setWorkingTime ({ commit, state }, data) {
    console.log('setting.js->' + data)
    commit('SET_WORKING_TIME', data)
  },
  setRestTime ({ commit, state }, data) {
    console.log('setting.js->' + data)
    commit('SET_REST_TIME', data)
  },
  setLongRestTime ({ commit, state }, data) {
    console.log('setting.js->' + data)
    commit('SET_LONG_REST_TIME', data)
  },
  setLongRestTimeInterval ({ commit, state }, data) {
    console.log('setting.js->' + data)
    commit('SET_LONG_REST_TIME_INTERVAL', data)
  }

}
export default {
  state,
  mutations,
  actions
}
