<template>
  <el-container style="margin:20px">
    <el-header style="-webkit-app-region: drag;-webkit-user-select: none">
      <el-col
        :span="4"
        style="-webkit-app-region: drag;-webkit-user-select: none"
      >
        <div class="grid-content">
          <router-link
            to="/"
            class="el-icon-back"
            style="-webkit-app-region: no-drag;"
            >返回</router-link
          >
        </div>
      </el-col>
      <el-col
        :span="20"
        style="-webkit-app-region: drag;-webkit-user-select: none;text-align:center"
      >
        <div class="grid-content">
          <h3>设置</h3>
        </div>
      </el-col>
      <router-view></router-view>
    </el-header>
    <el-main>
      <el-tabs tab-position="left" style="height: 500px;">
        <el-tab-pane label="通用管理">
          <el-row>
            <el-col :span="12">
              <div class="grid-content">工作时间:</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-row>
                  <el-col :span="12">
                    <el-slider
                      v-model="sliderWorkingTime"
                      @change="setWorkingTime"
                      :min="5"
                      :max="60"
                    ></el-slider>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content" style="margin-left:20px">
                      {{ sliderWorkingTime }}分钟
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row style="color: gray">
            <el-col :span="12">
              <div class="grid-content">短休息时间:</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-row>
                  <el-col :span="12">
                    <el-slider
                      v-model="sliderRestTime"
                      @change="setRestTime"
                      :min="5"
                      :max="60"
                    ></el-slider>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content" style="margin-left:20px">
                      {{ sliderRestTime }}分钟
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="grid-content">长休息时间:</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-row>
                  <el-col :span="12">
                    <el-slider
                      v-model="sliderLongRestTime"
                      @change="setLongRestTime"
                      :min="5"
                      :max="60"
                    ></el-slider>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content" style="margin-left:20px">
                      {{ sliderLongRestTime }}分钟
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row style="color: gray">
            <el-col :span="12">
              <div class="grid-content">长休息间隔数:</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-row>
                  <el-col :span="12">
                    <el-slider
                      v-model="sliderLongRestTimeInterval"
                      @change="setLongRestTimeInterval"
                      :min="1"
                      :max="20"
                    ></el-slider>
                  </el-col>
                  <el-col :span="12">
                    <div class="grid-content" style="margin-left:20px">
                      {{ sliderLongRestTimeInterval }}个间隔
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="grid-content">工作音乐:</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-select
                  v-model="workingValue"
                  placeholder="请选择"
                  @change="workingSelectChange"
                >
                  <el-option
                    v-for="item in workingOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-button>试听</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="grid-content">休息音乐:</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">
                <el-select
                  v-model="warningValue"
                  placeholder="请选择"
                  @change="warningSelectChange"
                >
                  <el-option
                    v-for="item in warningOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-button>试听</el-button>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="配置管理">
          <el-row>
            <el-col :span="24">
              <el-checkbox label="开机启动"></el-checkbox>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-checkbox
                label="播放工作音乐"
                v-model="isPlayWorkingAudio"
                @change="playWorkingMusic"
              ></el-checkbox>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="账户管理">
          <el-row v-if="isLogin == true">
            <el-col span="12">
            <div style="color:blue">{{userInfo}}</div>

            </el-col>
            <el-col span="12">
            <el-button type="info" @click="userQuite" size="mini">退出</el-button>

            </el-col>
          </el-row>
          <el-row v-if="isLogin == false">
            <el-row>
              <el-col :span="24">
                <el-input
                  placeholder="请输入邮箱"
                  v-model="inputEmail"
                  clearable
                ></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-input
                  placeholder="请输入密码"
                  v-model="inputPwd"
                  show-password
                ></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="text-align:center">
                <el-button type="primary" @click="regin">注册</el-button>

                <el-button type="success" @click="login">登录</el-button>
              </el-col>
            </el-row>
            <div style="color:red">{{ errorInfo }}</div>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-footer>
      <el-row>
        <el-col :span="24">
          <div class="grid-content" style="text-align:center">
            <el-button type="info">重置</el-button>
            <el-button type="primary">确定</el-button>
          </div>
        </el-col>
      </el-row>
    </el-footer>
  </el-container> </template
>>

<style>
a {
  text-decoration: none;
  color: grey;
}
h1 {
  text-align: center;
}
.el-row {
  margin-top: 10px;
}
</style>

<script>
const global = require("../utils/global");
export default {
  data() {
    return {
      num: 1,
      working: 25,
      workingOptions: [],
      warningOptions: [],
      workingValue:
        global.workingAudios[global.getUserConfig().workingAudioIndex].name,
      warningValue:
        global.warningAudios[global.getUserConfig().restAudioIndex].name,
      sliderWorkingTime: 25, // this.$store.state.setting.workingTime,
      sliderRestTime: this.$store.state.setting.restTime,
      sliderLongRestTime: this.$store.state.setting.longRestTime,
      sliderLongRestTimeInterval: this.$store.state.setting
        .longRestTimeInterval,
      isPlayWorkingAudio: global.getIsPlayWorkingAudio(),
      inputEmail: "",
      inputPwd: "",
      isLogin: this.$bmob.User.current()==null?false:true,
      errorInfo: "",
      userInfo: this.$bmob.User.current()==null?'':this.$bmob.User.current().username
    };
  },
  methods: {
    setWorkingTime(val) {
      console.log("->" + val);
      // this.sliderWorkingTime = val
      console.log(this.$execPath);
      this.$store.dispatch("setWorkingTime", val);
    },
    setRestTime(val) {
      console.log("->" + val);
      this.$store.dispatch("setRestTime", val);
    },
    setLongRestTime(val) {
      console.log("->" + val);
      this.$store.dispatch("setLongRestTime", val);
    },
    setLongRestTimeInterval(val) {
      this.$store.dispatch("setLongRestTimeInterval", val);
    },
    workingSelectChange(val) {
      console.log(val);
    },
    warningSelectChange(val) {
      console.log(val);
    },
    playWorkingMusic(val) {
      if (!val) {
        global.stopWorkingAudio();
      } else {
        global.playWorkingAudio();
      }
    },
    regin() {
      let email = this.inputEmail;
      let pwd = this.inputPwd;
      let params = {
        username: email,
        password: pwd,
        email: email,
      };
      this.$bmob.User.register(params)
        .then((res) => {
          console.log(res);
          if(res.code!=null){
            this.errorInfo=res.error
          }else{
              this.isLogin=true
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login() {
      let email = this.inputEmail;
      let pwd = this.inputPwd;
      console.log('.....>'+pwd)
      this.$bmob.User.login(email, pwd)
        .then((res) => {
          console.log('====>'+res);
          console.log(res.code);
          if(res.code!=null){
            this.errorInfo=res.error
           
          }else{
            console.log(res.username)
            this.isLogin=true
            this.userInfo=res.username
          }
        })
        .catch((err) => {
          console.log(err);
          if(err.code!=null){
            this.errorInfo=err.error
          }
        });
    },
    userQuite(){
      this.$bmob.User.logout()
      this.isLogin=false
    }
  },
  computed: {},
  created() {
    this.workingOptions.length = 0;
    let workingAudios = global.workingAudios;
    for (var i = 0; i < workingAudios.length; i++) {
      let value = workingAudios[i].index;
      let label = workingAudios[i].name;
      this.workingOptions.push({ value: value, label: label });
    }
    ///
    this.warningOptions.length = 0;
    let warningAduios = global.warningAudios;
    for (var i = 0; i < warningAduios.length; i++) {
      let value = warningAduios[i].index;
      let label = warningAduios[i].name;
      this.warningOptions.push({ value: value, label: label });
    }
    ///
  },
};
</script>
