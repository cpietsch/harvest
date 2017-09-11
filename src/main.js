// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'

Vue.use(VueRx, Rx)
Vue.config.productionTip = false

const fetchJson = url => {
  return fetch(url)
}

Vue.prototype.$reactivelyFetchData = function (urlOrGetter) {
  return this
    .$watchAsObservable(urlOrGetter)
    .pluck('newValue')
    .switchMap(url => Rx.Observable
      .fromPromise(fetch(url).then(r => r.json()))
      .catch((e) => {
        console.log("api fetch error", e)
        return Rx.Observable.of({ status: false })
      })
    )
    .filter(r => r.status)
    .map(r => r.data)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
