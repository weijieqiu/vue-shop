import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import WelCome from '../components/Welcome'
import UserList from '../components/UserList'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        redirect:'/welcome',
        children:[
            {
                path:'/welcome',
                name:'welcome',
                component:WelCome
            },
            {
                path:'/userList',
                name: 'userList',
                component: UserList
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path !== '/login') {
        if (sessionStorage.getItem('token')) {
            next();
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next();
    }


})

export default router
