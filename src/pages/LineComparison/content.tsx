import { useContext, useEffect } from 'react'

import { observer, useStore } from '@/hooks/storeHook'

import DataTable from './components/DataTable'
import EquipmentList from './components/EquipmentList'
import LineChart from './components/LineChart'
import Toolbar from './components/Toolbar'
import storeContext from './context'
import Styles from './index.module.scss'

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
      actions.getLineComparisonData(defaultSelectedAchieveKeys.map((key) => Number(key)))
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
            <LineChart />
          </div>
        )}
      </div>
    </div>
  )
}

export default observer(Content)
