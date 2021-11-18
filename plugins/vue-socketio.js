import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

export default ({ app, store }) => {
  Vue.use(new VueSocketIO({
    debug: true,
    vuex: {
      store,
      mutationPrefix: 'socket_',
      actionPrefix: 'socket_'
    },
    connection: SocketIO(process.env.WS_URL, {
      extraHeaders: {
        Authorization: ''
      },
      autoConnect: false
    })
  }))
}
