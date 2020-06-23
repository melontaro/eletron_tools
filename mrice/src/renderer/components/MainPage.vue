<template>
  <el-container style="overflow:hidden">
    <el-main style="padding: 0px">
      <el-row style="-webkit-app-region: drag;-webkit-user-select: none;">
        <el-col :span="9" style="padding:2px">
          <el-button
            size="mini"
            circle
            icon="el-icon-error"
            @click="hideMainWindow"
            style="-webkit-app-region: no-drag; "
          ></el-button>
        </el-col>
        <el-col :span="6">
          <div class="grid-content" style="-webkit-app-region: no-drag;text-align: center;">
            <el-radio-group v-model="tabPosition">
              <el-radio-button label="task">任务</el-radio-button>
              <el-radio-button label="todo">番茄</el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content" style="text-align:right;padding:5px">
            <el-row>
              <el-col :span="6">
                <el-tag type="success">{{stateStr}}</el-tag>
              </el-col>
              <el-col :span="6">
                <el-tag type="success" effect="dark">{{timeStr}}</el-tag>
              </el-col>
              <el-col :span="12">
                <el-button
                  v-if="stateStr=='未开始'"
                  class="el-icon-video-play"
                  type="success"
                  circle
                  @click="startWorking"
                  style="-webkit-app-region: no-drag;"
                ></el-button>
                <el-button
                  v-else
                  class="el-icon-remove"
                  type="success"
                  circle
                  @click="startWorking"
                  style="-webkit-app-region: no-drag;"
                ></el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>

      <ul
        class="infinite-list"
        v-infinite-scroll="load"
        style="overflow:auto;height:400px"
        v-if="tabPosition=='task'"
      >
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入内容" v-model="taskInput" class="input-with-select">
            <el-button slot="append" @click="addTask">↲</el-button>
          </el-input>
        </div>

        <el-row v-for="i in count" class="infinite-list-item">
          <el-col :span="4" style="padding-left:20px">
            <el-checkbox></el-checkbox>
          </el-col>
          <el-col :span="16">
            <div>{{getTaskCount[i-1].infor}}</div>
          </el-col>
          <el-col :span="2" style="padding-right:20px;">
            <el-button
              size="mini"
              round
              icon="el-icon-delete"
              class="icon-warp"
              style="border: none;"
              @click="removeTask(i-1)"
            ></el-button>
          </el-col>
          <el-col
            :span="2"
           
            >
            <el-color-picker></el-color-picker>
          </el-col>

          <el-divider></el-divider>
        </el-row>
      </ul>
    </el-main>
    <el-footer>
      <el-row>
        <el-col :span="12">
          <div class="grid-content" style="text-align:left">
            <router-link to="/">官网</router-link>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content" style="text-align:right">
            <router-link to="/setting" class="el-icon-setting" style="text-align:right"></router-link>
          </div>
        </el-col>
      </el-row>

      <router-view></router-view>
    </el-footer>
  </el-container>
</template
>>

<style>
body {
  font-family: "Source Sans Pro", sans-serif;
  overflow: hidden;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: auto;
  margin: 0%;
  width: 100vw;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}

.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 1px;
  margin: 0%;
  padding: 0px;
}
.row-bg {
  padding: 0px 0;
  background-color: #f9fafc;
}
.el-container {
  position: releative;
}
.el-footer {
  background-color: #e4e5e7;
  color: rgb(236, 232, 232);
  text-align: center;
  line-height: 60px;
  position: absolute;
  left: 0;
  right: 0;
}
.el-footer {
  bottom: 0;
}
.icon-warp {
  width: 20px;
  height: 20px;
  font-size: 20px;
  padding: 0px;
}
div.el-color-picker__trigger {
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 20px;
    width: 20px;
    padding: 4px;
    border: 1px solid #0362f1;
    border-radius: 4px;
    font-size: 0;
    position: relative;
    cursor: pointer;
}
</style>

<script>
import { ipcRenderer } from "electron";
const global = require("../utils/global");
export default {
  data() {
    return {
      taskInput: "",
      tabPosition: "task",
      timeStr: "25:00",
      stateStr: "未开始",
      count: this.$store.state.main.tasks.length
    };
  },
  methods: {
    startWorking() {
      let userState = global.getUserState();
      let userTime = 0;
      if (userState == 0) {
        userTime = global.getUserConfig().workingTime;
        this.$store.dispatch("startWorking", userTime);
        let audioPath =
          global.workingAudios[global.getUserConfig().workingAudioIndex].path;
        global.playAudio(audioPath);
        global.setUserState(1);
        this.stateStr = "工作中";
      } else if (userState == 1 || userState == 2) {
        this.$store.dispatch("stopWork");
        global.stopAudio();
        global.setUserState(0);
        this.stateStr = "未开始";
      }
    },
    hideMainWindow() {
      ipcRenderer.send("hideMainWindow");
    },
    load() {
      this.count; /// += 2
    },
    addTask() {
      this.$store.dispatch("addTask", this.taskInput);
      this.taskInput = "";
    },
    removeTask(index) {
      this.$store.dispatch("removeTask", index);
    }
  },
  computed: {
    getLeftWorkingTime() {
      return this.$store.state.main.leftWorkingTime;
    },
    getTaskCount() {
      return this.$store.state.main.tasks;
    }
  },
  watch: {
    getLeftWorkingTime: function(val) {
      if (global.getUserState() == 1) {
        console.log("watch--->" + val);
        this.stateStr = "工作中";

        let workTimeTemp = global.getUserConfig().workingTime * 60 - val;
        if (workTimeTemp >= 0) {
          this.timeStr =
            Math.floor(workTimeTemp / 60) + ":" + (workTimeTemp % 60);
        }
        if (workTimeTemp == 0) {
          // 休息倒计时
          this.stateStr = "休息中";
          global.setUserState(2);
          global.stopAudio();
          let audioPath =
            global.warningAudios[global.getUserConfig().restAudioIndex].path;
          global.playAudio(audioPath, false);
          this.$store.dispatch("startResting", global.getUserConfig().restTime);
        }
      }
      if (global.getUserState() == 2) {
        console.log("watch--->" + val);
        this.stateStr = "休息中";
        let restTimeTemp = global.getUserConfig().restTime * 60 - val;
        if (restTimeTemp >= 0) {
          this.timeStr =
            Math.floor(restTimeTemp / 60) + ":" + (restTimeTemp % 60);
        }
        if (restTimeTemp == 0) {
          // 工作倒计时
          this.stateStr = "工作中";
          global.setUserState(1);
          global.stopAudio();
          let audioPath =
            global.workingAudios[global.getUserConfig().workingAudioIndex].path;
          global.playAudio(audioPath, true);
          this.$store.dispatch(
            "startWorking",
             global.getUserConfig().workingTime
          );
        }
      }
    },
    getTaskCount: function(val) {
      this.count = val.length;
      console.log("this.count===========" + val[0].infor);
    }
  }
};
</script>
