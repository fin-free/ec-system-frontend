import { useState } from 'react'

import { Spin } from 'antd'
import { Outlet } from 'react-router-dom'

import ErrorBound from '@/components/ErrorBound'
import Header from '@/components/Header'
import SideNav from '@/components/SideNav'
import { observer, useStore } from '@/hooks/storeHook'

import Styles from './index.module.scss'

const Layout: React.FC = () => {
  const { commonStore } = useStore()
  const { showLoading } = commonStore
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={Styles.root}>
      <div className='layout_content'>
        <SideNav collapsed={collapsed} />
        <div className='main_content'>
          <Header collapsed={collapsed} onToggleClick={setCollapsed} />
          <ErrorBound>
            <Spin spinning={showLoading}>
              <Outlet />
            </Spin>
          </ErrorBound>
        </div>
      </div>
    </div>
  )
}

export default observer(Layout)
