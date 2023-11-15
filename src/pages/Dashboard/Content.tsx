import { observer } from '@/hooks/storeHook'

import Column from './components/Column'
import Pie from './components/Pie'
import Trend from './components/Trend'
import Style from './index.module.scss'

const Content: React.FC = () => {
  return (
    <div className={Style.root}>
      <Column />
      <Pie />
      <Trend />
    </div>
  )
}

export default observer(Content)
