import type { DataNode } from 'antd/es/tree'

import SearchInput from '@/components/SearchInput'
import Tree from '@/components/Tree'

import Styles from './EquipmentList.module.scss'

const EquipmentList = () => {
  const treeData: DataNode[] = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            { title: 'leaf', key: '0-0-0-0' },
            { title: 'leaf', key: '0-0-0-2' }
          ]
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',

          children: [{ title: 'leaf', key: '0-0-1-0' }]
        },
        {
          title: 'parent 1-2',
          key: '0-0-2',

          children: [
            { title: 'leaf', key: '0-0-2-0' },
            {
              title: 'leaf',
              key: '0-0-2-1'
            }
          ]
        }
      ]
    },
    {
      title: 'parent 2',
      key: '0-1',

      children: [
        {
          title: 'parent 2-0',
          key: '0-1-0',

          children: [
            { title: 'leaf', key: '0-1-0-0' },
            { title: 'leaf', key: '0-1-0-1' }
          ]
        }
      ]
    }
  ]

  return (
    <aside className={Styles.root}>
      <SearchInput rootClassName='search-input' />
      <Tree treeData={treeData} defaultExpandAll />
    </aside>
  )
}

export default EquipmentList
