import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/components/home.vue'
import cart from '@/components/cart.vue'
import center from '@/components/center.vue'
import news from '@/components/news/news.vue'
import newsdetail from '@/components/news/newsdetail.vue'
import { Lazyload, Icon } from 'vant'

Vue.use(Icon)
// options 为可选参数，无则不传
Vue.use(Lazyload)
Vue.use(VueRouter)

const routes = [
  { path: '/home', component: home },
  { path: '/cart', component: cart },
  { path: '/center', component: center },
  { path: '/news', component: news },
  { path: '/newsdetail/:id', component: newsdetail }
]

const router = new VueRouter({
  routes
})

export default router
