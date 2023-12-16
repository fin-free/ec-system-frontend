import { useEffect, useState } from 'react'

import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import Logo from '@/common/images/logo.svg?react'
import { ROUTE_PATH_ELECTRICITY_DATA_MANAGEMENT } from '@/routes/routePath'

import { defaultOpenKeys, INavMenus, LinkNavs, NavKeys, SideNavItems } from './constants'
import Styles from './index.module.scss'

type MenuItem = Required<MenuProps>['items'][number]

interface IProps {
  collapsed: boolean
}

const SideNav: React.FC<IProps> = ({ collapsed }: IProps) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [activeNav, setActiveNav] = useState<string>('')
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys)

  useEffect(() => {
    const matchedMenu = Object.entries(LinkNavs).find((menu) => menu[1] === pathname)
    if (matchedMenu) {
      setActiveNav(matchedMenu[0])
      setOpenKeys([findParentItem(SideNavItems, matchedMenu[0])?.key || ''])
    }
  }, [pathname])

  function findParentItem(items: INavMenus[], targetKey: string) {
    for (const item of items) {
      if (item.key === targetKey) {
        return null // 指定的项本身就是根元素，没有父元素
      }

      if (item.children) {
        for (const childItem of item.children) {
          if (childItem.key === targetKey) {
            return item
          }
        }
      }
    }

    return null // 没有找到指定 key 的父元素
  }

  const onLogoClick = () => {
    navigate(ROUTE_PATH_ELECTRICITY_DATA_MANAGEMENT)
  }

  const onMenuItemClick: MenuProps['onClick'] = (e) => {
    setActiveNav(e.key)
  }

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && openKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const recursiveMenu = (menus: INavMenus[]): MenuItem[] => {
    return menus.map((menu) => {
      const { label, path, key, IconCom, children } = menu
      return {
        key,
        icon: IconCom && <IconCom />,
        label,
        onClick: () => {
          path && pathname !== path && navigate(path)
        },
        children: children ? recursiveMenu(children) : undefined
      } as MenuItem
    })
  }

  const items = recursiveMenu(SideNavItems)

  return (
    <div className={Styles.root}>
      <div className='nav-logo'>
        <Logo onClick={onLogoClick} />
        {!collapsed && <span>能源管理系统</span>}
      </div>
      <Menu
        style={{ width: collapsed ? 60 : 190 }}
        onClick={onMenuItemClick}
        onOpenChange={onOpenChange}
        defaultSelectedKeys={[NavKeys.electricityDataSearch]}
        defaultOpenKeys={[NavKeys.dataSearch]}
        openKeys={openKeys}
        selectedKeys={[activeNav]}
        mode='inline'
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  )
}

export default SideNav
