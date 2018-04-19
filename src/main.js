import scss from './assets/stylesheets/app.scss'

import Vue from 'vue'
import Resource from 'vue-resource'
import Router from 'vue-router'

import App from './components/App.vue'
import Home from './components/home/Home.vue'
import Portfolio from './components/portfolio/Portfolio.vue'
import Contact from './components/contact/Contact.vue'
import Shop from './components/shop/Shop.vue'
import Quote from './components/Quote.vue'

// Install plugins
Vue.use(Router)
Vue.use(Resource)

// route config
let routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: Portfolio
  },
  {
      path: '/contact',
      name: 'contact',
      component: Contact
  },
  {
      path: '/shop',
      name: 'shop',
      component: Shop
  },
  {
    path: '/quote',
    name: 'quote',
    component: Quote
  },
  { path: '*', redirect: '/home' }
]

// Set up a new router
let router = new Router({
  routes: routes
})

// Start up our app
new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
