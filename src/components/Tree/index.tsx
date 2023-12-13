import { Tree as RcTree } from 'antd'
import type { TreeProps } from 'antd/es/tree'

import Styles from './index.module.scss'

interface IProps extends TreeProps {}

const Tree: React.FC<IProps> = (props: IProps) => {
  return <RcTree className={Styles.root} {...props} showLine={true} />
}

export default Tree
