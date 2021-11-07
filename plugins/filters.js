import Vue from 'vue'

Vue.filter('unixtime', v => new Date(Number(v)).toLocaleDateString())
