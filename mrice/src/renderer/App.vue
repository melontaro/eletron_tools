<template>
  <div id="app" style="overflow:hidden">
    <router-view></router-view>
  </div>
</template>

<script>
const fs = require("fs");
const global = require("./utils/global");
const localConfig = require("./utils/localConfig");
var log = require("electron-log");
export default {
  name: "mrice",
  warningAudios: [],
  created() {
    console.log(this.$execPath);
    if (this.$eStore.get("workingAudioName") == null) {
      console.log("无法读取本地存储的数据,可能数据不存在");
      this.$eStore.set("workingAudioName", "-------->dfg");
    } else {
      console.log(this.$eStore.get("workingAudioName"));
    }
    this.readWorkingAudioFile();
    this.readWarningAudioFile();
    this.setConfig();

    this.loadingServerConfig();
    this.loginServer()
  },
  methods: {
    createAudio() {
      
    },
    // 读取工作音效目录
    readWorkingAudioFile() {
      log.warn("APP.vue readWorkingAudioFile");
      let workingPath = this.$execPath + "/music/working/";
      fs.readdir(workingPath, function(err, files) {
        if (err) {
          console.log("readdir err:" + err);
          return;
        }
      
        for (var i = 0; i < files.length; i++) {
          let nameFile = files[i].split(".")[0];
          let isNewbie = global.checkIsNewbie();
          let isDefault = isNewbie && i == 0 ? true : false;
          global.workingAudios.push({
            index: i,
            name: nameFile,
            path: workingPath + files[i],
            isDefault: isDefault,
          });
        }
      });
    },
    // 读取工作音效目录
    readWarningAudioFile() {
      log.warn("APP.vue readWarningAudioFile");

      let warningPath = this.$execPath + "/music/warning/";
      fs.readdir(warningPath, function(err, files) {
        if (err) {
          console.log("readdir err:" + err);
          return;
        }
        for (var i = 0; i < files.length; i++) {
          let nameFile = files[i].split(".")[0];
          let isNewbie = global.checkIsNewbie();
          let isDefault = isNewbie && i == 0 ? true : false;
          global.warningAudios.push({
            index: i,
            name: nameFile,
            path: warningPath + files[i],
            isDefault: isDefault,
          });
        }
      });
    },
    //
    setConfig() {
      let isNewbie = global.checkIsNewbie();
      if (isNewbie) {
        let wTime = localConfig.defaultConfig.workTime;
        let rTime = localConfig.defaultConfig.restTime;
        let iTimes = localConfig.defaultConfig.intervalTimes;
        let lTime = localConfig.defaultConfig.longRestTime;
        let workAudioIndex = localConfig.defaultConfig.workingAudioIndex;
        let restingAudioIndex = localConfig.defaultConfig.restAudioIndex;
        global.setUserConfig({
          workingTime: wTime,
          restTime: rTime,
          intervalTimes: iTimes,
          longRestTime: lTime,
          workingAudioIndex: workAudioIndex,
          restAudioIndex: restingAudioIndex,
        });
      }
      global.getUserConfig();
      let isPlayWorkingAudio= this.$eStore.get('isPlayWorkingAudio')
      if(isPlayWorkingAudio==null||isPlayWorkingAudio==true){
          global.setIsPlayWorkingAudio(true)
      }else{
          global.setIsPlayWorkingAudio(false)
      }
      
    },
    loadingServerConfig() {
      const query = this.$bmob.Query("ConfigInfo");
      query.get("ekAHIIIa").then((res) => {
          global.setServerConfigInfo(res)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loginServer() {
      let userLoginInfo=this.$eStore.get("userLoginInfo");
      if(userLoginInfo!=null){
         let email = userLoginInfo.username;
      let pwd = userLoginInfo.pwd;
      this.$bmob.User.login(email, pwd)
        .then((res) => {
          console.log('====>'+res);
          
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
  },
};
</script>

<style>
/* CSS */
</style>
