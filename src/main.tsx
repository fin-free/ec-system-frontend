import React, { createContext } from 'react'

import { ConfigProvider } from 'antd'
import zh_CN from 'antd/locale/zh_CN'
import ReactDOM from 'react-dom/client'

import createRootStore, { IStore } from '@/store'

import App from './App.tsx'

export const context = createContext({} as IStore)
const root = ReactDOM.createRoot(document.getElementById('root') as Element)

createRootStore()
  .then((store) => {
    root.render(
      <React.StrictMode>
        <context.Provider value={store}>
          <ConfigProvider
            locale={zh_CN}
            theme={{
              token: { motion: false }
            }}
          >
            <App />
          </ConfigProvider>
        </context.Provider>
      </React.StrictMode>
    )
  })
  .catch((e) => console.log(e))
