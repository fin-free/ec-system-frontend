import { useContext, useEffect } from 'react'

import { observer } from '@/hooks/storeHook'

import AlarmTable from './components/AlarmTable'
import ConsumptionChart from './components/ConsumptionChart'
import StatisticsOverview from './components/StatisticsOverview'
import storeContext from './context'
import Style from './index.module.scss'

const Content: React.FC = () => {
  const { actions } = useContext(storeContext)
  useEffect(() => {
    actions.getStatisticSummaryData()
    actions.getEnergyConsumptionData()
    actions.getWaterCompareData()
  }, [])

  return (
    <div className={Style.root}>
      <StatisticsOverview />
      <ConsumptionChart />
      <AlarmTable />
    </div>
  )
}

export default observer(Content)
