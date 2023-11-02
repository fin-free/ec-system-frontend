import { observer } from '@/hooks/storeHook'

import Style from './index.module.scss'

const Content: React.FC = () => {
  return <div className={Style.root}>Dashboard-Content</div>
}

export default observer(Content)
