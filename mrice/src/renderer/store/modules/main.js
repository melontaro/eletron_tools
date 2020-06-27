const global = require("../../utils/global")

const state = {
  leftWorkingTime: 0,
  tasks: []
}
const mutations = {
  SET_WORKING_TIME(state, data) {
    state.leftWorkingTime = data
  },
  STOPWORK(state, data) {
    state.leftWorkingTime = 0
  },
  ADDTASK(state, data) {
    state.tasks.push({
      isChecked: false,
      infor: data
    })
  },
  REMOVETASK(state, data) {
    state.tasks.splice(data,1)
  }
}
const actions = {
  startWorking({
    commit,
    state
  }, data) {
    console.log('startWorking' + data)
    console.log('state==============>' + state.leftWorkingTime)
    let m = 1;

    let t = setInterval(function () {

      console.log(m);

      m++;
      commit('SET_WORKING_TIME', m)
      // 
      if (m >= data * 60) {
        clearInterval(global.getUserInterval());

        const ipc = require('electron').ipcRenderer
        ipc.send('open-info-dialog')
       

      }

    }, 1000);
    global.setUserInterval(t)

  },

  stopWork({
    commit,
    state
  }, data) {
    commit('STOPWORK')
    clearInterval(global.getUserInterval());
  },
  startResting({
    commit,
    state
  }, data) {
    console.log('startWorking' + data)
    console.log('state==============>' + state.leftWorkingTime)
    let m = 1;

    let t = setInterval(function () {

      console.log(m);

      m++;
      commit('SET_WORKING_TIME', m)
      // 
      if (m >= data * 60) {
        clearInterval(global.getUserInterval());

      }

    }, 1000);
    global.setUserInterval(t)

  },
  addTask({
    commit,
    state
  }, data) {
    commit('ADDTASK', data)
  },
  removeTask({
    commit,
    state
  }, data) {
    commit('REMOVETASK', data)
  }


}
export default {
  state,
  mutations,
  actions
}