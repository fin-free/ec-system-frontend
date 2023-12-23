import cx from 'classnames'

import { StatisticsCard } from '../types'

import Styles from './StatisticCard.module.scss'

const StatisticCard: React.FC<StatisticsCard> = (props: StatisticsCard) => {
  const { title, value, orderNum } = props
  return (
    <div className={Styles.root}>
      <div className={cx(Styles[`type-${orderNum}`])}>{title}</div>
      <div>{value}</div>
    </div>
  )
}

export default StatisticCard
