import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import Styles from './index.module.scss'

interface IProps {
  collapsed: boolean
  onToggleClick: (collapsed: boolean) => void
}

const Header: React.FC<IProps> = ({ collapsed, onToggleClick }: IProps) => {
  return (
    <div className={Styles.root}>
      {collapsed ? (
        <MenuUnfoldOutlined onClick={() => onToggleClick(false)} />
      ) : (
        <MenuFoldOutlined onClick={() => onToggleClick(true)} />
      )}
    </div>
  )
}

export default Header
