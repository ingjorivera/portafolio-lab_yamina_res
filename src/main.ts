import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Quasar, Notify } from 'quasar'
import quasarLang from 'quasar/lang/es'
import quasarIconSet from 'quasar/icon-set/fontawesome-v5'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'
//import router from './router'

const app = createApp(App)

app.use(createPinia())
//app.use(router)
app.use(Quasar, {
    plugins: {
      Notify
    }, // import Quasar plugins and add here
    lang: quasarLang,
    iconSet: quasarIconSet,
    config: {
      
      brand: {
        primary: '#374B96',
        secondary: '#34BAE9',
        accent: '#24B200',
        positive: '#21BA45',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F2C037'
      }
    }
  })

app.mount('#app')
