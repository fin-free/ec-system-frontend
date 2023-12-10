import { useContext, useEffect, useRef } from 'react'
import EquipmentList from './components/EquipmentList'
import { autorun } from 'mobx'
import Toolbar from './components/Toolbar'
import { observer } from '@/hooks/storeHook'
import storeContext from './context'
import Styles from './index.module.scss'
import G6, { TreeGraph } from '@antv/g6'

const Content: React.FC = () => {
  const { store, actions } = useContext(storeContext)
  const graphRef = useRef<TreeGraph>()
  const mapLossToTreeData = (lossData: Array<any>) => {
    return lossData?.length > 0
      ? lossData.map((root) => {
          const newRoot = {} as any
          newRoot.id = String(root.archivesId)
          newRoot.label = root.archivesName
          newRoot.children = mapLossToTreeData(root.childrenList)
          return newRoot
        })
      : []
  }
  useEffect(() => {
    const graph = new G6.TreeGraph({
      container: 'mountNode',
      layout: {
        // Object，对于 TreeGraph 为必须字段
        type: 'compactBox',
        direction: 'TB'
      },
      width: 800, // Number，必须，图的宽度
      height: 500 // Number，必须，图的高度
    })
    graphRef.current = graph
    actions.getLossCompareData()
    return () => {
      graphRef.current?.destroy()
    }
  }, [])

  // useEffect(() => {
  //   if (lossCompareData.length > 0 && graphRef.current) {
  //     graphRef.current?.clear()
  //     graphRef.current?.data(lossCompareData[0])
  //     graphRef.current?.render()
  //   }
  // }, [lossCompareData])
  autorun(() => {
    if (store.lossCompareData.length > 0 && graphRef.current) {
      graphRef.current.clear()
      graphRef.current.data(mapLossToTreeData(store.lossCompareData)[0]) // 读取 Step 2 中的数据源到图上
      graphRef.current.render() // 渲染图
    }
  })

  return (
    <div className={Styles.root}>
      <EquipmentList />
      <div className='content'>
        <Toolbar />
        <div id='mountNode'></div>
      </div>
    </div>
  )
}

export default observer(Content)
