import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import chat from '@/components/chat'
import friend from '@/components/friend'
import collect from '@/components/collect'
import test from '@/components/test'
import Set from '@/components/Set'

Vue.use(Router)


const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)

}

const router= new Router({
  routes: [
    {
      path: '/login',
      name: 'index',
      component: index
    },
		{
		  path: '/Set',
		  name: 'Set',
		  component: Set
		},
		{
		  path: '/test',
		  name: 'test',
		  component: test
		},
		{
		  path: '/chat',
		  name: 'chat',
		  component: chat
		},
		{
		  path: '/friend',
		  name: 'friend',
		  component: friend
		},
		{
		  path: '/collect',
		  name: 'collect',
		  component: collect
		}
  ]
})
//导航守卫
// router.beforeEach((to, from, next) => {
// if (to.path === '/login') {
	
//     next();
// } else {
// 	console.log("导航守卫")
// //	//取token
//     let token = localStorage.getItem('Authorization');
//     if (token ==null|| token === ''||token==='undefined') {//如果token不存在
//       console.log("token==null to /login")
//       next('/login');//跳转至登录页面
//     } else {    	
//       console.log(to.fullPath)    	
//       next();//正常跳转
//     }
// }
// });

export default router;
