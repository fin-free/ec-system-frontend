import { useContext, useEffect } from 'react'

import DataTable from './components/DataTable'
import EquipmentList from './components/EquipmentList'
import Toolbar from './components/Toolbar'
import storeContext from './context'
import Styles from './index.module.scss'
import ColumnChart from './components/ColumnChart'
import LineChart from './components/LineChart'

const Content: React.FC = () => {
  const {
    actions,
    store: { mode }
  } = useContext(storeContext)

  useEffect(() => {
    actions.getComparativeData()
  }, [])

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

export default Content
