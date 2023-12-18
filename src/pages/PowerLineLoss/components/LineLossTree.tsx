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

// Highcharts.chart('container', {
//   chart: {
//       spacingBottom: 30,
//       marginRight: 120
//   },
//   title: {
//       text: 'Phylogenetic language tree'
//   },
//   series: [
//       {
//           type: 'treegraph',
//           keys: ['parent', 'id', 'level'],
//           clip: false,
//           data: [
//               [undefined, 'Proto Indo-European'],
//               ['Proto Indo-European', 'Balto-Slavic'],
//               ['Proto Indo-European', 'Germanic'],
//               ['Proto Indo-European', 'Celtic'],
//               ['Proto Indo-European', 'Italic'],
//               ['Proto Indo-European', 'Hellenic'],
//               ['Proto Indo-European', 'Anatolian'],
//               ['Proto Indo-European', 'Indo-Iranian'],
//               ['Proto Indo-European', 'Tocharian'],
//               ['Indo-Iranian', 'Dardic'],
//               ['Indo-Iranian', 'Indic'],
//               ['Indo-Iranian', 'Iranian'],
//               ['Iranian', 'Old Persian'],
//               ['Old Persian', 'Middle Persian'],
//               ['Indic', 'Sanskrit'],
//               ['Italic', 'Osco-Umbrian'],
//               ['Italic', 'Latino-Faliscan'],
//               ['Latino-Faliscan', 'Latin'],
//               ['Celtic', 'Brythonic'],
//               ['Celtic', 'Goidelic'],
//               ['Germanic', 'North Germanic'],
//               ['Germanic', 'West Germanic'],
//               ['Germanic', 'East Germanic'],
//               ['North Germanic', 'Old Norse'],
//               ['North Germanic', 'Old Swedish'],
//               ['North Germanic', 'Old Danish'],
//               ['West Germanic', 'Old English'],
//               ['West Germanic', 'Old Frisian'],
//               ['West Germanic', 'Old Dutch'],
//               ['West Germanic', 'Old Low German'],
//               ['West Germanic', 'Old High German'],
//               ['Old Norse', 'Old Icelandic'],
//               ['Old Norse', 'Old Norwegian'],
//               ['Old Swedish', 'Middle Swedish'],
//               ['Old Danish', 'Middle Danish'],
//               ['Old English', 'Middle English'],
//               ['Old Dutch', 'Middle Dutch'],
//               ['Old Low German', 'Middle Low German'],
//               ['Old High German', 'Middle High German'],
//               ['Balto-Slavic', 'Baltic'],
//               ['Balto-Slavic', 'Slavic'],
//               ['Slavic', 'East Slavic'],
//               ['Slavic', 'West Slavic'],
//               ['Slavic', 'South Slavic'],
//               // Leaves:
//               ['Proto Indo-European', 'Phrygian', 6],
//               ['Proto Indo-European', 'Armenian', 6],
//               ['Proto Indo-European', 'Albanian', 6],
//               ['Proto Indo-European', 'Thracian', 6],
//               ['Tocharian', 'Tocharian A', 6],
//               ['Tocharian', 'Tocharian B', 6],
//               ['Anatolian', 'Hittite', 6],
//               ['Anatolian', 'Palaic', 6],
//               ['Anatolian', 'Luwic', 6],
//               ['Anatolian', 'Lydian', 6],
//               ['Iranian', 'Balochi', 6],
//               ['Iranian', 'Kurdish', 6],
//               ['Iranian', 'Pashto', 6],
//               ['Iranian', 'Sogdian', 6],
//               ['Old Persian', 'Pahlavi', 6],
//               ['Middle Persian', 'Persian', 6],
//               ['Hellenic', 'Greek', 6],
//               ['Dardic', 'Dard', 6],
//               ['Sanskrit', 'Sindhi', 6],
//               ['Sanskrit', 'Romani', 6],
//               ['Sanskrit', 'Urdu', 6],
//               ['Sanskrit', 'Hindi', 6],
//               ['Sanskrit', 'Bihari', 6],
//               ['Sanskrit', 'Assamese', 6],
//               ['Sanskrit', 'Bengali', 6],
//               ['Sanskrit', 'Marathi', 6],
//               ['Sanskrit', 'Gujarati', 6],
//               ['Sanskrit', 'Punjabi', 6],
//               ['Sanskrit', 'Sinhalese', 6],
//               ['Osco-Umbrian', 'Umbrian', 6],
//               ['Osco-Umbrian', 'Oscan', 6],
//               ['Latino-Faliscan', 'Faliscan', 6],
//               ['Latin', 'Portugese', 6],
//               ['Latin', 'Spanish', 6],
//               ['Latin', 'French', 6],
//               ['Latin', 'Romanian', 6],
//               ['Latin', 'Italian', 6],
//               ['Latin', 'Catalan', 6],
//               ['Latin', 'Franco-Provençal', 6],
//               ['Latin', 'Rhaeto-Romance', 6],
//               ['Brythonic', 'Welsh', 6],
//               ['Brythonic', 'Breton', 6],
//               ['Brythonic', 'Cornish', 6],
//               ['Brythonic', 'Cuymbric', 6],
//               ['Goidelic', 'Modern Irish', 6],
//               ['Goidelic', 'Scottish Gaelic', 6],
//               ['Goidelic', 'Manx', 6],
//               ['East Germanic', 'Gothic', 6],
//               ['Middle Low German', 'Low German', 6],
//               ['Middle High German', '(High) German', 6],
//               ['Middle High German', 'Yiddish', 6],
//               ['Middle English', 'English', 6],
//               ['Middle Dutch', 'Hollandic', 6],
//               ['Middle Dutch', 'Flemish', 6],
//               ['Middle Dutch', 'Dutch', 6],
//               ['Middle Dutch', 'Limburgish', 6],
//               ['Middle Dutch', 'Brabantian', 6],
//               ['Middle Dutch', 'Rhinelandic', 6],
//               ['Old Frisian', 'Frisian', 6],
//               ['Middle Danish', 'Danish', 6],
//               ['Middle Swedish', 'Swedish', 6],
//               ['Old Norwegian', 'Norwegian', 6],
//               ['Old Norse', 'Faroese', 6],
//               ['Old Icelandic', 'Icelandic', 6],
//               ['Baltic', 'Old Prussian', 6],
//               ['Baltic', 'Lithuanian', 6],
//               ['Baltic', 'Latvian', 6],
//               ['West Slavic', 'Polish', 6],
//               ['West Slavic', 'Slovak', 6],
//               ['West Slavic', 'Czech', 6],
//               ['West Slavic', 'Wendish', 6],
//               ['East Slavic', 'Bulgarian', 6],
//               ['East Slavic', 'Old Church Slavonic', 6],
//               ['East Slavic', 'Macedonian', 6],
//               ['East Slavic', 'Serbo-Croatian', 6],
//               ['East Slavic', 'Slovene', 6],
//               ['South Slavic', 'Russian', 6],
//               ['South Slavic', 'Ukrainian', 6],
//               ['South Slavic', 'Belarusian', 6],
//               ['South Slavic', 'Rusyn', 6]
//           ],
//           marker: {
//               symbol: 'circle',
//               radius: 6,
//               fillColor: '#ffffff',
//               lineWidth: 3
//           },
//           dataLabels: {
//               align: 'left',
//               pointFormat: '{point.id}',
//               style: {
//                   color: '#000000',
//                   textOutline: '3px #ffffff',
//                   whiteSpace: 'nowrap'
//               },
//               x: 24,
//               crop: false,
//               overflow: 'none'
//           },
//           levels: [
//               {
//                   level: 1,
//                   levelIsConstant: false
//               },
//               {
//                   level: 2,
//                   colorByPoint: true
//               },
//               {
//                   level: 3,
//                   colorVariation: {
//                       key: 'brightness',
//                       to: -0.5
//                   }
//               },
//               {
//                   level: 4,
//                   colorVariation: {
//                       key: 'brightness',
//                       to: 0.5
//                   }
//               },
//               {
//                   level: 6,
//                   dataLabels: {
//                       x: 10
//                   },
//                   marker: {
//                       radius: 4
//                   }
//               }
//           ]
//       }
//   ]
// });
