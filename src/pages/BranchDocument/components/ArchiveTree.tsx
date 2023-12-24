import React, { useContext, useEffect, useRef } from 'react'

import G6, { TreeGraph } from '@antv/g6'

import { observer, useStore } from '@/hooks/storeHook'
import { TreeNode } from '@/types'

import storeContext from '../context'

G6.registerNode(
  'icon-node',
  {
    options: {
      size: [60, 20], // 宽高
      stroke: '#91d5ff', // 变颜色
      fill: '#fff' // 填充色
    },
    update: undefined
  },
  'rect'
)
G6.registerEdge('flow-line', {
  // 绘制后的附加操作
  draw(cfg, group) {
    // 边两端与起始节点和结束节点的交点；
    const startPoint = cfg.startPoint
    const endPoint = cfg.endPoint
    // 边的配置
    const { style } = cfg
    const shape = group.addShape('path', {
      attrs: {
        stroke: style?.stroke, // 边框的样式
        endArrow: style?.endArrow, // 结束箭头
        // 路径
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
// 默认的鼠标悬停会加粗,边框颜色改变
const defaultStateStyles = {
  hover: {
    stroke: '#1890ff',
    lineWidth: 2
  }
}

// 默认节点的颜色 边 圆角的配置
const defaultNodeStyle = {
  fill: '#26266d',
  stroke: '#ccc',
  radius: 5
}

// 默认边的颜色 末尾箭头
const defaultEdgeStyle = {
  stroke: '#ccc'
}

// 默认布局
// compactBox 紧凑树布局
// 从根节点开始，同一深度的节点在同一层，并且布局时会将节点大小考虑进去。
const defaultLayout = {
  type: 'compactBox', // 布局类型树
  direction: 'TB', // TB 根节点在上，往下布局
  getId: function getId(d: any) {
    // 节点 id 的回调函数
    return d.id
  },
  getHeight: function getHeight() {
    // 节点高度的回调函数
    return 16
  },
  getWidth: function getWidth() {
    // 节点宽度的回调函数
    return 16
  },
  getVGap: function getVGap() {
    // 节点纵向间距的回调函数
    return 40
  },
  getHGap: function getHGap() {
    // 节点横向间距的回调函数
    return 70
  }
}

// 文本配置项
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
    store: { selectedNode },
    actions
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
    const graph = new G6.TreeGraph({
      container: 'mountRoot', // 图的 DOM 容器
      // width: 1000,
      // height: 800,
      linkCenter: true, // 指定边是否连入节点的中心
      // plugins: [menu], // 插件  minimap
      modes: {
        // 交互模式
        // default 模式中包含点击选中节点行为和拖拽画布行为;
        default: [
          // {
          //   // 这个是可以展开可以收起
          //   type: 'collapse-expand',
          //   onChange: function onChange(item, collapsed) {
          //     const data = item?.get('model')
          //     data.collapsed = collapsed
          //     return true
          //   }
          // },
          'drag-canvas',
          'scroll-canvas'
        ]
      },
      // 默认状态下节点的配置
      defaultNode: {
        type: 'icon-node',
        size: [120, 60],
        style: defaultNodeStyle,
        labelCfg: defaultLabelCfg
      },
      // 默认状态下边的配置，
      defaultEdge: {
        type: 'flow-line',
        style: defaultEdgeStyle
      },
      // 各个状态下节点的样式-，例如 hover、selected，3.1 版本新增。
      nodeStateStyles: defaultStateStyles,

      // 各个状态下边的样式-，例如 hover、selected，3.1 版本新增。
      edgeStateStyles: defaultStateStyles,
      // 布局配置项
      layout: defaultLayout
    })
    graphRef.current = graph
    return () => {
      graphRef.current?.destroy()
    }
  }, [])
  useEffect(() => {
    const graph = graphRef.current
    graph?.clear()
    if (achieveList.length > 0) {
      graph?.data(mapTreeData(selectedNode ? getNode(achieveList, selectedNode?.archivesId)?.[0] : achieveList[0]))
      graph?.render()
      // 让画布内容适应视口。
      graph?.fitCenter()
      // 改变视口的缩放比例，在当前画布比例下缩放，是相对比例。
      graph?.zoom(1)
    }
  }, [achieveList, selectedNode])
  return <div id='mountRoot' style={{ width: '100%', height: 'calc(100vh - 122px)' }}></div>
}

export default observer(ArchiveTree)
