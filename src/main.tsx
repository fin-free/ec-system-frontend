import React from 'react'

import { ConfigProvider, theme } from 'antd'
import locale from 'antd/locale/zh_CN'
import ReactDOM from 'react-dom/client'

import 'dayjs/locale/zh-cn'

import StoreContext from '@/contexts/storeContext'
import createRootStore from '@/store'

import App from './App.tsx'

const root = ReactDOM.createRoot(document.getElementById('root') as Element)

const customTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    motion: false,
    colorBgContainer: 'transparent',
    colorTextBase: '#d0d0d0',
    colorBgElevated: '#0a0a24',
    colorBorder: '#26266d',
    colorText: '#d0d0d0',
    colorBgTextHover: '#1b1b3d',
    bgElevated: 'transparent',
    controlOutline: '#26266d',
    hoverBorderColor: '#5858db'
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
    },
    Radio: {
      groupBorderColor: '#26266d',
      groupBorderActiveColor: '#5858db',
      colorPrimary: '#5858db',
      colorPrimaryHover: '#8d8df3',
      colorText: '#6e6ed6',
      colorPrimaryActive: '#9f9ff3'
    },
    Button: {
      colorPrimary: '#26266d',
      colorPrimaryHover: '#5858db',
      colorPrimaryActive: '#26266d'
    },
    Typography: {
      colorLink: '#5858db',
      colorLinkHover: '#8d8df3',
      colorLinkActive: '#5858db'
    },
    Input: {
      colorPrimary: '#5858db',
      colorPrimaryHover: '#8d8df3',
      colorPrimaryActive: '#5858db'
    },
    DatePicker: {
      colorPrimary: '#5858db',
      colorPrimaryHover: '#8d8df3',
      colorPrimaryActive: '#5858db',
      cellHoverWithRangeBg: '#26266d'
    },
    Select: {
      colorPrimary: '#5858db',
      colorPrimaryHover: '#8d8df3',
      colorPrimaryActive: '#5858db'
    },
    Pagination: {
      colorPrimary: '#5858db',
      colorPrimaryHover: '#8d8df3',
      colorPrimaryActive: '#5858db'
    }
  }
}

createRootStore()
  .then((store) => {
    root.render(
      <React.StrictMode>
        <StoreContext.Provider value={store}>
          <ConfigProvider locale={locale} theme={customTheme}>
            <App />
          </ConfigProvider>
        </StoreContext.Provider>
      </React.StrictMode>
    )
  })
  .catch((e) => console.log(e))
