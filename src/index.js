const Vue = require('vue');
const VueRouter = require('vue-router').default;
const Vuex = require('vuex').default;

const ServiceWorker = require(
    'file-loader?name=sw.[hash:hex:3].[ext]!./serviceworker.js');
const GlobalCSS = require('./css/global.scss');
const Bulma = require('./css/bulma.scss');
const FontAwesome = require('@fortawesome/fontawesome-free/js/all.js');
const Favicon = require('./favicon.ico');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register(ServiceWorker).
        then(console.log).
        catch(console.error);
  });
}

Vue.use(VueRouter);
Vue.use(Vuex);

const routes = {};

const components = require.context('./components', true, /.vue$/);
components.keys().forEach(fileName => {
  const config = components(fileName).default;
  const name = config.name;
  routes[name] = Vue.component(name, config);
});

const store = new Vuex.Store({
  state: {
    user: {
      isLogin: false,
    },
    team: {},
  },
  mutations: {
    updateUser(state, info) {
      state.user = info;
    },
    updateTeam(state, info) {
      state.team = info;
    },
  },
});

const router = new VueRouter({
  routes: [
    {path: '/', component: routes.home},
    {path: '/search', component: routes.search},
    {path: '/scoreboard', component: routes.scoreboard},
    {path: '/challenges', component: routes.challenges},
    {path: '/profile', component: routes.profile},
    {path: '/login', component: routes.login},
    {path: '/register', component: routes.register},
  ],
});

const Polyfill = require('./polyfill')(router);

const app = new Vue({
  el: '#app',
  router,
  store,
  data: {},
  beforeUpdate() {

  },
  computed: {},
  mounted() {
    this.updateUserInfo();
  },
  methods: {
    updateUserInfo() {
      return Promise.all([
        APIFetch('/user/info/user').then(data => {
          if (data.code === 0) {
            data.data.isLogin = true;
            store.commit('updateUser', data.data);
          }
        }),
        APIFetch('/user/info/team').then(data => {
          if (data.code === 0) {
            store.commit('updateTeam', data.data);
          }
        })]);
    },
  },
});


