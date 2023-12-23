import { useContext, useEffect } from 'react'

import { Radio, RadioChangeEvent, Table, Typography } from 'antd'
import dayjs from 'dayjs'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'
import { Item } from '../types'

import Styles from './AlarmTable.module.scss'

const AlarmTable: React.FC = () => {
  const { store, actions } = useContext(storeContext)

  useEffect(() => {
    actions.getAlarmData()
  }, [])

  const EventStatus = {
    WAIT_FOR_CONFIRM: 0,
    CONFIRMED: 1,
    CANCELLED: 2
  }

  const alarmType = [
    '全部',
    '过压告警',
    '过流告警',
    '超功率告警',
    '温度告警',
    '湿度告警',
    '集中器掉线'
  ]

  const eventStatusMap = {
    [EventStatus.WAIT_FOR_CONFIRM]: '待确认',
    [EventStatus.CONFIRMED]: '已处理',
    [EventStatus.CANCELLED]: '已取消'
  }

  const columnNameMap: Record<string, string> = {
    type: '告警类型',
    equipmentNum: '设备',
    gatewayNum: '网关地址',
    alarmDetail: '告警详情',
    status: '事件状态',
    startTime: '发生时间',
    operations: '操作'
  }

  const getColumnsRender = (itemKey: string) => {
    switch (itemKey) {
      case 'operations':
        // eslint-disable-next-line react/display-name
        return (_: any, record: Item) =>
          record.status === EventStatus.WAIT_FOR_CONFIRM ? (
            <div className={Styles.operationWrapper}>
              <Typography.Link
                disabled={false}
                onClick={() => onClickConfirm(record)}
              >
                确认
              </Typography.Link>
              <Typography.Link
                disabled={false}
                onClick={() => onClickCancel(record)}
              >
                取消
              </Typography.Link>
            </div>
          ) : null
      case 'startTime':
        return (val: any) => {
          return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
        }
      case 'type':
        return (val: any) => {
          return alarmType[val]
        }
      case 'status':
        return (val: any) => {
          return eventStatusMap[val]
        }
      default:
        return (val: any) => val
    }
  }

  const columns = Object.keys(columnNameMap).map((itemKey) => {
    const render = getColumnsRender(itemKey)
    return {
      title: columnNameMap[itemKey],
      dataIndex: itemKey,
      ellipsis: itemKey === 'alarmDetail',
      align: (['status', 'operations'].includes(itemKey)
        ? 'center'
        : 'left') as any,
      width: ['type', 'status', 'operations'].includes(itemKey)
        ? 130
        : itemKey === 'alarmDetail'
        ? 400
        : undefined,
      render
    }
  })
  const onClickConfirm = (record: Item) => {
    actions.operateAlarm([record.alarmId], EventStatus.CONFIRMED)
  }

  const onClickCancel = (record: Item) => {
    actions.operateAlarm([record.alarmId], EventStatus.CANCELLED)
  }
  const onChangeHandler = (e: RadioChangeEvent) => {
    actions.updateStatus(e.target.value)
  }

  return (
    <div className={Styles.root}>
      <div className='toolbar'>
        <Radio.Group onChange={onChangeHandler} defaultValue={0}>
          <Radio.Button value={0}>待处理警告</Radio.Button>
          <Radio.Button value={-1}>全部</Radio.Button>
        </Radio.Group>
      </div>
      <Table
        size='small'
        bordered
        dataSource={store.filterAlarmData}
        columns={columns}
        className={Styles.mainTable}
      />
    </div>
  )
}

export default observer(AlarmTable)
