import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    nitro(
      process.env.DEPLOY_TARGET === 'azure'
        ? {
            preset: './nitro/presets/azure-swa-custom.mjs', //original template: 'azure-swa'
            azure: {
              config: {
                routes: [
                  {
                    route: '/_serverFn/*',
                    rewrite: '/api/server',
                  },
                ],
              },
            },
          }
        : undefined,
    ), 
    devtools(), 
    tailwindcss(), 
    tanstackStart(), 
    viteReact()
  ],
})

export default config
