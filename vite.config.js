import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
//更改主题色-添加内容【引入index.scss内容】
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import ElmentPlus from 'unplugin-element-plus/vite'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    //更改主题色-添加内容
    ElmentPlus({
      useSource: true,
    }),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'sass'})],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass'})],
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  //更改主题色-添加内容
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/assets/index.scss" as *;
        `,
      }
    }
  },

})
