<template>
  <el-container style="margin:20px">
    <el-header >
    <el-col :span="4"><div class="grid-content "><router-link to="/" class="el-icon-back">返回</router-link></div></el-col>
    <el-col :span="20" style="-webkit-app-region: drag;-webkit-user-select: none;text-align:center"><div class="grid-content "><h3 >设置</h3></div></el-col>
      <router-view></router-view>
    </el-header>
    <el-main>
        <el-row>
            <el-col :span="12"><div class="grid-content">工作时间:</div></el-col>
            <el-col :span="12"><div class="grid-content ">
            <el-row>
              <el-col :span="12"><el-slider v-model ="sliderWorkingTime"  @change="setWorkingTime" :min="5" :max="60"></el-slider></el-col>
              <el-col :span="12"><div class="grid-content" style="margin-left:20px">{{sliderWorkingTime}}分钟</div></el-col>
            </el-row>
            </div></el-col>   
        </el-row>
        <el-row style="color: gray">
         <el-col :span="12"><div class="grid-content"> 短休息时间:</div></el-col>
            <el-col :span="12"><div class="grid-content ">
            <el-row>
              <el-col :span="12"><el-slider v-model ="sliderRestTime"  @change="setRestTime" :min="5" :max="60"></el-slider></el-col>
              <el-col :span="12"><div class="grid-content" style="margin-left:20px">{{sliderRestTime}}分钟</div></el-col>
            </el-row>
            </div></el-col>   
        </el-row>
        <el-row> 
         <el-col :span="12"><div class="grid-content">长休息时间:</div></el-col>
            <el-col :span="12"><div class="grid-content ">
            <el-row>
              <el-col :span="12"><el-slider v-model ="sliderLongRestTime"  @change="setLongRestTime" :min="5" :max="60"></el-slider></el-col>
              <el-col :span="12"><div class="grid-content" style="margin-left:20px">{{sliderLongRestTime}}分钟</div></el-col>
            </el-row>
            </div></el-col>
        </el-row>
        <el-row style="color: gray"> 
         <el-col :span="12"><div class="grid-content">长休息间隔数:</div></el-col>
            <el-col :span="12"><div class="grid-content ">
            <el-row>
              <el-col :span="12"><el-slider v-model ="sliderLongRestTimeInterval"  @change="setLongRestTimeInterval" :min="1" :max="20"></el-slider></el-col>
              <el-col :span="12"><div class="grid-content" style="margin-left:20px">{{sliderLongRestTimeInterval}}个间隔</div></el-col>
            </el-row>
            </div></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><div class="grid-content ">工作音乐:</div></el-col>
            <el-col :span="12"><div class="grid-content ">
            <el-select v-model="workingValue" placeholder="请选择" @change="workingSelectChange">
            <el-option
                v-for="item in workingOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
             </el-select>
             <el-button >试听</el-button>
      </div></el-col>
        </el-row>
        <el-row>
        
        <el-col :span="12"><div class="grid-content ">休息音乐:</div></el-col>
            <el-col :span="12"><div class="grid-content ">
            <el-select v-model="warningValue" placeholder="请选择" @change="warningSelectChange">
            <el-option
                v-for="item in warningOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
             </el-select>
             <el-button>试听</el-button>
      </div></el-col>
        </el-row>
    </el-main>
    <el-footer>
      <el-row>
        <el-col :span="24"><div class="grid-content " style="text-align:center">
          <el-button type="info">重置</el-button>
          <el-button type="primary">确定</el-button>
          </div></el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>>

<style>
    a {
        text-decoration: none;
        color: grey;
    }
    h1 {
        text-align: center;
    }
    .el-row{
        margin-top: 10px;
    }
</style>

<script>
const global = require("../utils/global");
  export default {
    data () {
      return {
        num: 1,
        working: 25,
        workingOptions: [],
        warningOptions: [],
        workingValue: global.workingAudios[global.getUserConfig().workingAudioIndex].name ,
        warningValue: global.warningAudios[global.getUserConfig().restAudioIndex].name,
        sliderWorkingTime: 25, // this.$store.state.setting.workingTime,
        sliderRestTime: this.$store.state.setting.restTime,
        sliderLongRestTime: this.$store.state.setting.longRestTime,
        sliderLongRestTimeInterval: this.$store.state.setting.longRestTimeInterval
      }
    },
    methods: {
      setWorkingTime (val) {
        console.log('->' + val)
        // this.sliderWorkingTime = val
        console.log(this.$execPath)
        this.$store.dispatch('setWorkingTime', val)
      },
      setRestTime (val) {
        console.log('->' + val)
        this.$store.dispatch('setRestTime', val)
      },
      setLongRestTime (val) {
        console.log('->' + val)
        this.$store.dispatch('setLongRestTime', val)
      },
      setLongRestTimeInterval (val) {
        this.$store.dispatch('setLongRestTimeInterval', val)
      },
      workingSelectChange (val){
        console.log(val)
        
      },
      warningSelectChange (val) {
        console.log(val)
      }

    },
    computed: {
    },
    created() {
      this.workingOptions.length=0
      let workingAudios= global.workingAudios
      for(var i=0;i<workingAudios.length;i++){
        let value=workingAudios[i].index
        let label=workingAudios[i].name
        this.workingOptions.push({value:value,label:label})
      }
      /// 
      this.warningOptions.length=0
      let warningAduios=global.warningAudios
      for(var i=0;i<warningAduios.length;i++)
      {
        let value=warningAduios[i].index
        let label=warningAduios[i].name
        this.warningOptions.push({value:value,label:label})
      }
    }

  }
</script>