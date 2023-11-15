import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined } from '@ant-design/icons'

import { UserInfo } from '@/types'

import Styles from './index.module.scss'

interface IProps {
  collapsed: boolean
  userInfo: UserInfo
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
      <div className='logout'>
        <span>{userInfo?.userName}</span>
        <PoweroffOutlined className='logout-icon' onClick={onLogout} />
      </div>
    </div>
  )
}

export default Header
