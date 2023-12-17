import { useContext, useEffect } from 'react'

import { observer } from '@/hooks/storeHook'

import EquipmentList from './components/EquipmentList'
import LineLossTree from './components/LineLossTree'
import Toolbar from './components/Toolbar'
import storeContext from './context'
import Styles from './index.module.scss'

const Content: React.FC = () => {
  const { actions } = useContext(storeContext)
  useEffect(() => {
    actions.getLossCompareData()
  }, [])
  return (
    <div className={Styles.root}>
      <EquipmentList />
      <div className='content'>
        <Toolbar />
        <LineLossTree />
      </div>
    </div>
  )
}

export default observer(Content)
