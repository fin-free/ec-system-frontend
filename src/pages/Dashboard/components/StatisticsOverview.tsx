import { useContext } from 'react'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import StatisticCard from './StatisticCard'
import Styles from './StatisticsOverview.module.scss'

const StatisticsOverview: React.FC = () => {
  const { store } = useContext(storeContext)
  const { statisticsList } = store

  return (
    <div className={Styles.root}>
      {statisticsList.map((s) => (
        <StatisticCard key={s.key} title={s.title} value={s.value} />
      ))}
    </div>
  )
}

export default observer(StatisticsOverview)
