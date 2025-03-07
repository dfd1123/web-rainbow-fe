import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation"
import tsconfigPaths from 'vite-tsconfig-paths'
import { dependencies } from './package.json'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const isProduction = mode === 'production';

  const plugins = [react(), tsconfigPaths(),];

  if (isProduction) {
    plugins.push(
      federation({
        name: 'shell',
        filename: 'remoteEntry.js',
        // Modules to expose
        remotes: {
            'rb_video': 'http://localhost:5173/assets/remoteEntry.js',
        },
        shared: {
          "react":{
            shareScope: 'shell',
            requiredVersion: dependencies.react,
          },
          "react-dom":{
            shareScope: 'shell',
            requiredVersion: dependencies.react,
          },
        },
      })
    )
  }

  return {
    build: {
      target: "esnext",
    },
    plugins: plugins,
    server: {
      port: 5174,
    },
    preview: {
      port: 5174,
    }
    
  }
})
