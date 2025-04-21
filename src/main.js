import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'  //element-plus汉化
import 'element-plus/dist/index.css' //element-plus
import './assets/global.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn' //element-plus汉化
import * as ElementPlusIconsVue from '@element-plus/icons-vue'  //Icon图标

const app = createApp(App)

app.use(router)
app.use(ElementPlus, {  //element-plus
    locale: zhCn,
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {  //Icon图标
    app.component(key, component)
}

app.mount('#app')

