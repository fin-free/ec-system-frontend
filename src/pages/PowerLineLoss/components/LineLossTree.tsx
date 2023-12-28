import React, { useContext, useEffect, useRef } from 'react'

import G6, { ToolBar, TreeGraph } from '@antv/g6'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './LineLossTree.module.scss'

G6.registerNode(
  'icon-node',
  {
    options: {
      size: [60, 20],
      stroke: '#91d5ff',
      fill: '#fff'
    },
    update: undefined
  },
  'rect'
)
G6.registerEdge('flow-line', {
  draw(cfg, group) {
    const startPoint = cfg.startPoint
    const endPoint = cfg.endPoint
    const { style } = cfg
    const shape = group.addShape('path', {
      attrs: {
        stroke: style?.stroke,
        endArrow: style?.endArrow,
        path: [
          ['M', startPoint?.x, startPoint?.y],
          ['L', startPoint?.x, (startPoint?.y! + endPoint?.y!) / 2],
          ['L', endPoint?.x, (startPoint?.y! + endPoint?.y!) / 2],
          ['L', endPoint?.x, endPoint?.y]
        ]
      }
    })

    return shape
  }
})

const defaultStateStyles = {
  hover: {
    stroke: '#1890ff',
    lineWidth: 2
  }
}

const defaultNodeStyle = {
  fill: '#26266d',
  stroke: '#ccc',
  radius: 5
}

const defaultEdgeStyle = {
  stroke: '#ccc'
}

const defaultLayout = {
  type: 'compactBox',
  direction: 'TB',
  getId: function getId(d: any) {
    return d.id
  },
  getHeight: function getHeight() {
    return 16
  },
  getWidth: function getWidth() {
    return 16
  },
  getVGap: function getVGap() {
    return 40
  },
  getHGap: function getHGap() {
    return 70
  }
}

const defaultLabelCfg = {
  style: {
    fill: '#fff',
    fontSize: 10
  }
}

const ArchiveTree: React.FC = () => {
  const {
    store: { treeLossCompareData }
  } = useContext(storeContext)
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
    const toolbar = new ToolBar()
    const graph = new G6.TreeGraph({
      container: 'mountRoot',
      linkCenter: true,
      modes: {
        default: [
          {
            // 这个是可以展开可以收起
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              const data = item?.get('model')
              data.collapsed = collapsed
              return true
            }
          },
          'drag-canvas',
          'scroll-canvas'
        ]
      },
      plugins: [toolbar],
      defaultNode: {
        type: 'icon-node',
        size: [120, 60],
        style: defaultNodeStyle,
        labelCfg: defaultLabelCfg
      },
      defaultEdge: {
        type: 'flow-line',
        style: defaultEdgeStyle
      },
      nodeStateStyles: defaultStateStyles,
      edgeStateStyles: defaultStateStyles,
      layout: defaultLayout
    })

    graphRef.current = graph
    return () => {
      graphRef.current?.destroy()
    }
  }, [])

  useEffect(() => {
    const graph = graphRef.current
    if (treeLossCompareData.length > 0 && graph) {
      graph.clear()
      graph.data(mapLossToTreeData(treeLossCompareData)[0])
      graph.render()
      graph.fitCenter()
      graph.zoom(1)
      if (graph.getNodes().length > 10) graph.fitView()
    }
  }, [treeLossCompareData])

  return <div className={Styles.treeWrapper} id='mountRoot'></div>
}

export default observer(ArchiveTree)
