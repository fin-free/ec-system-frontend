import React from 'react'

import { ConfigProvider, theme } from 'antd'
import zh_CN from 'antd/locale/zh_CN'
import ReactDOM from 'react-dom/client'

import StoreContext from '@/contexts/storeContext'
import createRootStore from '@/store'

import App from './App.tsx'

const root = ReactDOM.createRoot(document.getElementById('root') as Element)

const customTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    motion: false,
    colorBgContainer: 'transparent',
    colorTextBase: '#d8d8d8',
    colorBgElevated: '#0a0a24',
    colorBorder: '#8f8f8f33',
    colorText: '#d8d8d8',
    colorBgTextHover: '#1b1b3d',
    bgElevated: 'transparent'
  },
  components: {
    Menu: {
      colorItemBgActive: '#26266d',
      colorItemTextActive: '#ffffff',
      colorItemBgSelected: '#26266d',
      colorItemTextSelected: '#ffffff'
    },
    Tree: {
      borderRadius: 0,
      colorBgContainer: 'transparent',
      nodeSelectedBg: '#26266d'
    }
  }
}

createRootStore()
  .then((store) => {
    root.render(
      <React.StrictMode>
        <StoreContext.Provider value={store}>
          <ConfigProvider locale={zh_CN} theme={customTheme}>
            <App />
          </ConfigProvider>
        </StoreContext.Provider>
      </React.StrictMode>
    )
  })
  .catch((e) => console.log(e))
