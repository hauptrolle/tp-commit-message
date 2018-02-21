import Vue from 'vue'
import root from './root.vue'
import AtComponents from 'at-ui'
import 'at-ui-style'

Vue.config.productionTip = false

Vue.use(AtComponents)

/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(root)
})
