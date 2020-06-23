import Vue from 'vue'
import Router from 'vue-router'
import Setting from '@/components/SettingPage.vue'
// import Main from '@/components/MainPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: require('@/components/MainPage').default
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    },
    {
      path: '*',
      redirect: '/'
    }

  ]
})
