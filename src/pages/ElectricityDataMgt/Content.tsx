import { useContext, useEffect } from 'react'

import { observer } from '@/hooks/storeHook'
import DataTable from './components/DataTable'
import EquipmentList from './components/EquipmentList'
import Toolbar from './components/Toolbar'
import storeContext from './context'
import Styles from './index.module.scss'
import Chart from './components/Chart'

const Content: React.FC = () => {
  const {
    actions,
    store: { mode }
  } = useContext(storeContext)

  useEffect(() => {
    actions.getElectricityTableData()
  }, [])

  return (
    <div className={Styles.root}>
      <EquipmentList />
      <div className='content'>
        <Toolbar />
        {mode === 'table' ? <DataTable /> : <Chart />}
      </div>
    </div>
  )
}

export default observer(Content)
