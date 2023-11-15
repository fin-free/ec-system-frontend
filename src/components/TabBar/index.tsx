import { observer, useStore } from '@/hooks/storeHook'

import Styles from './index.module.scss'
import Tab from './Tab'

const TabBar: React.FC = () => {
  const {
    commonStore: { activeTabs }
  } = useStore()

  const onTabClick = () => {
    alert('tab clicked')
  }

  return (
    <div className={Styles.root}>
      {activeTabs.map(({ key, name }) => (
        <Tab key={key} name={name} onTabClick={onTabClick} />
      ))}
    </div>
  )
}

export default observer(TabBar)
