import Vue from 'vue'

Vue.filter('unixdate', v => new Date(Number(v)).toLocaleDateString())
Vue.filter('unix', v => new Date(Number(v)).toLocaleString())
Vue.filter('bool', v => v ? 'Verdadeiro' : 'Falso')
Vue.filter('boolyn', v => v ? 'Sim' : 'Não')
