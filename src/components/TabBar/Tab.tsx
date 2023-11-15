import { CloseOutlined } from '@ant-design/icons'

import Styles from './Tab.module.scss'

interface IProps {
  name: string
  onTabClick: () => void
}

const Tab: React.FC<IProps> = (props: IProps) => {
  const { name } = props
  return (
    <div className={Styles.root}>
      <span>{name}</span>
      <CloseOutlined className='icon-close' />
    </div>
  )
}

export default Tab
