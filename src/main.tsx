import React from 'react'

import { ConfigProvider, theme } from 'antd'
import zh_CN from 'antd/locale/zh_CN'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      locale={zh_CN}
      theme={{
        algorithm: theme.darkAlgorithm
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
