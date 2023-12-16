import React, { useContext, useEffect, useRef } from 'react'
import G6, { TreeGraph } from '@antv/g6'
import { observer } from '@/hooks/storeHook'
import storeContext from '../context'
// import storeContext from '../context'
const ArchiveTree: React.FC = () => {
  const {
    store: { treeLossCompareData }
  } = useContext(storeContext)
  // const { actions } = useContext(storeContext)
  const graphRef = useRef<TreeGraph>()
  const mapLossToTreeData = (lossData: Array<any>) => {
    return lossData?.length > 0
      ? lossData.map((root) => {
          const newRoot = {} as any
          newRoot.id = String(root.archivesId)
          newRoot.label = `${root.archivesName} \n用电量: ${root.energyValue}\n线损：${root.loseValue} 线损率：${root.loseRateValue}%`
          newRoot.children = mapLossToTreeData(root.childrenList)
          return newRoot
        })
      : []
  }
  useEffect(() => {
    const graph = new G6.TreeGraph({
      container: 'mountRoot',
      layout: {
        // Object，对于 TreeGraph 为必须字段
        type: 'compactBox',
        direction: 'TB'
      },
      fitView: true,
      defaultNode: {
        // 节点类型，cicle:圆形，rect:矩形，ellipse:椭圆，diamond:菱形，triangle：三角形，star：五角星，image：图片，modelRect：卡片
        type: 'rect',
        // size 设置矩形的长和宽
        size: [60, 34],
        // 指定边连入节点的连接点的位置，可以为空，具体可以看一下官网是通过0、0.5、1来控制哪个点的。
        anchorPoints: [
          [0.5, 1],
          [0.5, 0]
        ],
        // 节点样式
        style: {
          // 节点填充色
          fill: '#DDE2E9',
          // 节点的描边颜色。
          stroke: '',
          // 阴影颜色
          shadowColor: '#f00',
          // 阴影范围
          shadowBlur: 5,
          // 鼠标经过是的形状，跟css是一样的。
          cursor: 'pointer',
          // 圆角
          radius: 4
        },
        // 配置节点中的文字。
        labelCfg: {
          // 节点文字位置
          position: 'center',
          // 偏移量
          // offset: -15,
          // 标签的样式属性。
          style: {
            // 文本颜色
            fill: '#535D79',
            // 文本字体大小
            fontSize: 6
          }
        }
      },
      modes: {
        default: [
          {
            type: 'scroll-canvas'
          }
        ]
      },
      defaultEdge: {
        type: 'polyline'
      },
      width: 1000, // Number，必须，图的宽度
      height: 600 // Number，必须，图的高度
    })
    // graph.on('node:click', (evt) => {
    //   const item = evt.item // 被操作的节点 item
    //   const target = evt.target // 被操作的具体图形
    //   console.log(item?._cfg?.model?.id, target)
    //   actions.updateSelectedArchivesId(item?._cfg?.model?.id as string)
    //   // ...
    // })
    graphRef.current = graph
    return () => {
      graphRef.current?.destroy()
    }
  }, [])

  useEffect(() => {
    const graph = graphRef.current
    graph?.clear()
    if (treeLossCompareData.length > 0) {
      graph?.data(mapLossToTreeData(treeLossCompareData)[0])
      graph?.render()
    }
  }, [treeLossCompareData])
  return <div id='mountRoot'></div>
}

export default observer(ArchiveTree)
