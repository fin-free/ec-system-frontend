import React, { useContext, useEffect, useRef } from 'react'

import G6, {
  IG6GraphEvent,
  Item,
  ModelConfig,
  ToolBar,
  TreeGraph,
  TreeGraphData
} from '@antv/g6'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './LineLossTree.module.scss'

const defaultExpandLevel = 2
G6.registerNode(
  'icon-node',
  {
    draw(cfg: ModelConfig, group) {
      const { collapsed, label, loseValue, loseRateValue } = cfg
      const rectConfig = {
        stroke: '#ccc',
        fill: '#26266d',
        width: 120,
        height: 60,
        radius: 5
      }

      const nodeOrigin = {
        x: 0,
        y: 0
      }

      const rect = group.addShape('rect', {
        attrs: {
          x: nodeOrigin.x,
          y: nodeOrigin.y,
          ...rectConfig
        }
      })

      group.addShape('text', {
        attrs: {
          text: label,
          fontSize: 10,
          fill: '#fff',
          x: 60,
          y: 45,
          textAlign: 'center'
        },
        name: 'title-shape'
      })

      group.addShape('text', {
        attrs: {
          text: `线损：${loseValue} 线损率：${loseRateValue}%`,
          fontSize: 10,
          fill: '#ef5757',
          x: 60,
          y: 45,
          textAlign: 'center'
        },
        name: 'lose-shape'
      })

      // 展开收起 rect
      if (cfg.children instanceof Array && cfg.children?.length) {
        group.addShape('marker', {
          attrs: {
            x: rectConfig.width / 2,
            y: rectConfig.height,
            r: 8,
            cursor: 'pointer',
            symbol: collapsed ? G6.Marker.expand : G6.Marker.collapse,
            stroke: '#26266d',
            lineWidth: 1,
            fill: '#fff'
          },
          name: 'collapse-icon'
        })
      }
      return rect
    },
    update(cfg, item) {
      const { collapsed } = cfg
      const width = 120
      const marker = item
        .get('group')
        .find((ele: any) => ele.get('name') === 'collapse-icon')
      marker.attr('x', width / 2)
    },
    setState(name, value, item?: Item) {
      if (name === 'collapsed' && item) {
        const marker = item
          .get('group')
          .find((ele: any) => ele.get('name') === 'collapse-icon')
        const icon = value ? G6.Marker.expand : G6.Marker.collapse
        marker.attr('symbol', icon)
      }
    }
  },
  // 继承内置节点类型的名字
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

const dataTypeMap: Record<string, string> = {
  '0002': '电',
  '0001': '水'
}

const ArchiveTree: React.FC = () => {
  const {
    store: { treeLossCompareData, filters }
  } = useContext(storeContext)
  const graphRef = useRef<TreeGraph>()
  const mapLossToTreeData = (lossData: Array<any>, level = 1) => {
    return lossData?.length > 0
      ? lossData.map((root) => {
          const newRoot = {} as any
          newRoot.id = String(root.archivesId)
          newRoot.collapsed =
            typeof root.collapsed === 'boolean'
              ? root.collapsed
              : level > defaultExpandLevel
          newRoot.label = `${root.archivesName} \n用${
            dataTypeMap[filters.datatype]
          }量: ${root.energyValue}\n`
          newRoot.children = mapLossToTreeData(root.childrenList, level + 1)
          newRoot.loseValue = root.loseValue
          newRoot.loseRateValue = root.loseRateValue
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
        default: ['drag-canvas', 'scroll-canvas']
      },
      plugins: [toolbar],
      defaultNode: {
        type: 'icon-node'
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
    graph.on('node:click', (e: IG6GraphEvent) => {
      const { item } = e
      if (item) {
        item.getModel().collapsed = !item.getModel().collapsed
        graph.setItemState(
          item,
          'collapsed',
          (item.getModel() as TreeGraphData).collapsed!
        )
        graph.refreshItem(item)
        graph.layout()
      }
    })
    return () => {
      graphRef.current?.destroy()
    }
  }, [])

  useEffect(() => {
    const graph = graphRef.current
    if (treeLossCompareData.length && graph) {
      graph.clear()
      graph.data(mapLossToTreeData(treeLossCompareData)[0])
      graph.render()
      graph.fitCenter()
      graph.zoom(1)
      if (graph.getNodes().length > 10) graph.fitView()
    }
  }, [treeLossCompareData])

  return (
    <div key={'lineLoss'} className={Styles.treeWrapper} id='mountRoot'></div>
  )
}

export default observer(ArchiveTree)
