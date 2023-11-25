import React from 'react'

import { ConfigProvider } from 'antd'
import zh_CN from 'antd/locale/zh_CN'
import ReactDOM from 'react-dom/client'

import StoreContext from '@/contexts/storeContext'
import createRootStore from '@/store'

import App from './App.tsx'

const root = ReactDOM.createRoot(document.getElementById('root') as Element)

const customTheme = {
  token: {
    motion: false,
    colorBgContainer: '#001529',
    colorTextBase: '#ffffff',
    colorBgElevated: '#001529'
  },
  components: {
    Table: {
      rowSelectedBg: '#001529',
      rowSelectedHoverBg: '#001529'
    },
    Select: {
      selectorBg: '#001529',
      optionSelectedBg: '#001529'
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
