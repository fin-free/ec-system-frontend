import { StatisticsCard } from '../types'

import Styles from './StatisticCard.module.scss'

interface IProps extends StatisticsCard {}

const StatisticCard: React.FC<IProps> = (props: IProps) => {
  const { title, value } = props
  return (
    <div className={Styles.root}>
      <div>{title}</div>
      <div>{value}</div>
    </div>
  )
}

export default StatisticCard
