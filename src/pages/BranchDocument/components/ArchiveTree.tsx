import React, { useContext, useEffect, useRef } from 'react'

import G6, {
  ToolBar,
  TreeGraph,
  ModelConfig,
  Item,
  IG6GraphEvent,
  TreeGraphData
} from '@antv/g6'

import { observer, useStore } from '@/hooks/storeHook'
import { TreeNode } from '@/types'

import storeContext from '../context'

import Styles from './ArchieveTree.module.scss'
const defaultExpandLevel = 2

G6.registerNode(
  'icon-node-branch',
  {
    draw(cfg: ModelConfig, group) {
      const { collapsed, label } = cfg
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
          y: 35,
          textAlign: 'center'
        },
        name: 'title-shape'
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

const ArchiveTree: React.FC = () => {
  const {
    commonStore: { achieveList }
  } = useStore()
  const {
    store: { selectedNode }
  } = useContext(storeContext)
  const graphRef = useRef<TreeGraph>()
  const mapTreeData = (root: any, level = 1) => {
    if (!root) return {}
    const newRoot = {} as any
    newRoot.id = String(root.key)
    newRoot.label = root.title
    newRoot.collapsed =
      typeof root.collapsed === 'boolean'
        ? root.collapsed
        : level > defaultExpandLevel
    newRoot.children = root.children.map((child: any) => {
      return mapTreeData(child, level + 1)
    })
    return newRoot
  }

  const getNode = (list: TreeNode[], id?: number): TreeNode[] | undefined => {
    if (!id) return list
    if (!list || list.length === 0) return undefined
    for (const data of list) {
      if (data.key === String(id)) {
        return [data]
      }
      const res = getNode(data.children!, id)
      if (res) return res
    }
    return undefined
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
        type: 'icon-node-branch'
      },
      defaultEdge: {
        type: 'flow-line',
        style: defaultEdgeStyle
      },
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
    if (achieveList.length > 0 && graph) {
      graph.clear()
      graph.data(
        mapTreeData(
          selectedNode
            ? getNode(achieveList, selectedNode?.archivesId)?.[0]
            : achieveList[0]
        )
      )
      graph.render()
      graph.fitCenter()
      graph.zoom(1)
      if (graph.getNodes().length > 10) graph.fitView()
    }
  }, [achieveList, selectedNode])

  return <div id='mountRoot' className={Styles.root}></div>
}

export default observer(ArchiveTree)
