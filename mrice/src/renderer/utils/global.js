export const warningAudios = []
// 定义全局音效存储
export const workingAudios = []

// 当前状态 0 表示无任何倒计时操作,1表示工作状态,2 表示休息状态
let userState=0

export function setUserState(param) {
    userState=param
}
export function getUserState() {
    return userState
}
// 
let userInterval=null
export function setUserInterval(param) {
    userInterval=param
}
export function getUserInterval() {
    return userInterval
}
/*
    检测是否新手
*/
export const EStore = require('electron-store')
export const eStore = new EStore()
export function checkIsNewbie () {
    if (eStore.get("isNewbie") == null) { // 新手
        console.log('global true1')
        return true
    }else(eStore.get("isNewbie")==true)
    {
        console.log('global false2')
        return false
    }
    console.log('global true3')
    return true
}

// 获取或设置本地配置信息
let userConfig =null
export function setUserConfig(val){
    userConfig=val
    eStore.set('userConfig',userConfig)
}

export function getUserConfig(){
    if(userConfig==null){
      userConfig=  eStore.get('userConfig')
    }
    return userConfig
}

// 播放音乐
let userAduio=null
export function playAudio(path,isloop=true){
    userAduio = new Audio()
    userAduio.src = path
    userAduio.loop= isloop
    userAduio.play()
}

export function stopAudio(){
    if(userAduio!=null){
        userAduio.pause() 
    }
    
}

export function playWorkingAudio(){
    if(userAduio!=null){
        userAduio.play() 
    }
    
}

// 获取本地版本
let localVersion=1.0

export function getLocalVersion(){
    return localVersion
}
// 存储服务器获得的数据
let serverConfigInfo=null

export function getServerConfigInfo(){
    return serverConfigInfo
}

export function setServerConfigInfo(val) {
    serverConfigInfo=val
}