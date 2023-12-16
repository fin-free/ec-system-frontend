import EquipmentList from './components/EquipmentList'
import Toolbar from './components/Toolbar'
import { observer } from '@/hooks/storeHook'
import Styles from './index.module.scss'
import LineLossTree from './components/lineLossTree'
import { useContext, useEffect } from 'react'
import storeContext from './context'

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
