import React, { useContext, useEffect, useRef } from 'react'

import G6, { ToolBar, TreeGraph } from '@antv/g6'

import { observer, useStore } from '@/hooks/storeHook'
import { TreeNode } from '@/types'

import storeContext from '../context'

import Styles from './ArchieveTree.module.scss'

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
    commonStore: { achieveList }
  } = useStore()
  const {
    store: { selectedNode }
  } = useContext(storeContext)
  const graphRef = useRef<TreeGraph>()
  const mapTreeData = (root: any) => {
    if (!root) return {}
    const newRoot = {} as any
    newRoot.id = String(root.key)
    newRoot.label = root.title
    newRoot.children = root.children.map((child: any) => {
      return mapTreeData(child)
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
    if (achieveList.length > 0 && graph) {
      graph.clear()
      graph.data(mapTreeData(selectedNode ? getNode(achieveList, selectedNode?.archivesId)?.[0] : achieveList[0]))
      graph.render()
      graph.fitCenter()
      graph.zoom(1)
      if (graph.getNodes().length > 10) graph.fitView()
    }
  }, [achieveList, selectedNode])

  return <div id='mountRoot' className={Styles.root}></div>
}

export default observer(ArchiveTree)
