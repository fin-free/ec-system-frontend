import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import { UserInfo } from '@/types'

import Styles from './index.module.scss'

interface IProps {
  collapsed: boolean
  userInfo?: UserInfo
  onToggleClick: (collapsed: boolean) => void
  onLogout: () => void
}

const Header: React.FC<IProps> = ({ collapsed, userInfo, onToggleClick, onLogout }: IProps) => {
  return (
    <div className={Styles.root}>
      {collapsed ? (
        <MenuUnfoldOutlined onClick={() => onToggleClick(false)} />
      ) : (
        <MenuFoldOutlined onClick={() => onToggleClick(true)} />
      )}
      <Dropdown
        trigger={['click']}
        placement='bottom'
        overlayStyle={{}}
        menu={{
          items: [{ label: '退出登录', key: 'logout' }],
          onClick: onLogout
        }}
        autoAdjustOverflow={true}
        align={{
          offset: [-10, 10]
        }}
      >
        <div className='account'>
          <span>{userInfo?.realName}</span>
          <UserOutlined />
        </div>
      </Dropdown>
    </div>
  )
}

export default Header
