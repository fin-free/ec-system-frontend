import { useContext, useEffect } from 'react'

import DataTable from './components/DataTable'
import EquipmentList from './components/EquipmentList'
import Toolbar from './components/Toolbar'
import storeContext from './context'
import Styles from './index.module.scss'
import ColumnChart from './components/ColumnChart'
import LineChart from './components/LineChart'

import { observer, useStore } from '@/hooks/storeHook'

const Content: React.FC = () => {
  const {
    actions,
    store: { mode }
  } = useContext(storeContext)
  const {
    commonStore: { defaultSelectedAchieveKeys }
  } = useStore()

  useEffect(() => {
    if (defaultSelectedAchieveKeys && defaultSelectedAchieveKeys.length > 0) {
      actions.getComparativeData(defaultSelectedAchieveKeys[0])
    }
  }, [defaultSelectedAchieveKeys])

  return (
    <div className={Styles.root}>
      <EquipmentList />
      <div className='content'>
        <Toolbar />
        {mode === 'table' ? (
          <DataTable />
        ) : (
          <div>
            <ColumnChart />
            <LineChart />
          </div>
        )}
      </div>
    </div>
  )
}

export default observer(Content)
