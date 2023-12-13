import { Radio, Table } from 'antd'

import Styles from './AlarmTable.module.scss'

const AlarmTable: React.FC = () => {
  const columns = [
    { title: '序号', dataIndex: 'orderNum', width: 100 },
    { title: '告警类型', dataIndex: 'name' },
    { title: '设备', dataIndex: 'date' },
    { title: '网关地址', dataIndex: 'voltage' },
    { title: '告警详情', dataIndex: 'voltage' },
    { title: '事件状态', dataIndex: 'voltage' },
    { title: '发生时间', dataIndex: 'voltage' },
    { title: '操作', dataIndex: 'voltage' }
  ]
  const onChangeHandler = () => {}

  return (
    <div className={Styles.root}>
      <div className='toolbar'>
        <Radio.Group onChange={onChangeHandler} defaultValue='todo'>
          <Radio.Button value='todo'>待处理警告</Radio.Button>
          <Radio.Button value='all'>全部</Radio.Button>
        </Radio.Group>
      </div>
      <Table columns={columns} />
    </div>
  )
}

export default AlarmTable
