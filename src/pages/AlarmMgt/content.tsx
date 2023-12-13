import React, { useContext, useState } from 'react'

import { Button, DatePicker, Flex, Form, Select, Table, Typography } from 'antd'

import { observer } from '@/hooks/storeHook'

import storeContext from './context'
import Styles from './index.module.scss'
import { Item } from './typings'

const EventStatus = {
  WAIT_FOR_CONFIRM: 0,
  CONFIRMED: 1,
  CANCELLED: 2
}

const eventStatusMap = {
  [EventStatus.WAIT_FOR_CONFIRM]: '待确认',
  [EventStatus.CONFIRMED]: '已处理',
  [EventStatus.CANCELLED]: '已取消'
}

const { RangePicker } = DatePicker

const columnNameMap: Record<string, string> = {
  type: '告警类型',
  equipmentNum: '设备',
  gatewayNum: '网关地址',
  alarmDetail: '告警详情',
  status: '事件状态',
  startTime: '发生时间',
  operations: '操作'
}

const alarmType = ['全部', '过压告警', '过流告警', '超功率告警', '温度告警', '湿度告警', '集中器掉线']
const alarmTypeOptions = alarmType.map((item, index) => ({
  label: item,
  value: index
}))

const eventStatusOptions = Object.values(EventStatus).map((status) => ({
  label: eventStatusMap[status],
  value: status
}))

const Content: React.FC = () => {
  const [form] = Form.useForm()
  const [selectedRows, setSelectedRows] = useState<Array<React.Key>>([])
  const { store, actions } = useContext(storeContext)
  const dateFormat = 'YYYY/MM/DD';

  const onClickCancel = (record: Item) => {
    actions.operateAlarm([record.alarmId], EventStatus.CANCELLED);
  }

  const onClickConfirm = (record: Item) => {
    actions.operateAlarm([record.alarmId], EventStatus.CONFIRMED);
  }

  const handleBatchConfirm = () => {
    actions.operateAlarm(selectedRows, EventStatus.CONFIRMED);
  }

  const handleBatchCancel = () => {
    actions.operateAlarm(selectedRows, EventStatus.CANCELLED);
  }

  const handleEventStatusChange = (e: number) => {
    store.changeEventStatus(e)
  }

  const handleAlarmTypeChange = (e: number) => {
    store.changeAlarmType(e)
  }

  const handleSearchClick = () => {
    actions.fetchData()
  }

  const handleResetClick = () => {
    actions.resetData()
  }


  const getColumnsRender = (itemKey: string) => {
    switch (itemKey) {
      case 'operations':
        return (_: any, record: Item) => {
          return record.status === EventStatus.WAIT_FOR_CONFIRM ? (
            <div className={Styles.operationWrapper}>
              <Typography.Link disabled={false} onClick={() => onClickConfirm(record)}>
                确认
              </Typography.Link>
              <Typography.Link disabled={false} onClick={() => onClickCancel(record)}>
                取消
              </Typography.Link>
            </div>
          ) : undefined
        }
      case 'type':
        return (_: any, record: Item) => {
          return alarmType[record.type]
        }
      case 'status':
        return (_: any, record: Item) => {
          return eventStatusMap[record.status]
        }
      default:
        return null
    }
  }

  const columns = Object.keys(columnNameMap).map((itemKey) => {
    const render = getColumnsRender(itemKey)
    return {
      title: columnNameMap[itemKey],
      dataIndex: itemKey,
      ...itemKey === 'alarmDetail' ? {ellipsis: true}: null,
      ...(render ? { render } : null)
    }
  })

  const rowSelection = {
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRows(newSelectedRowKeys);
    },
    getCheckboxProps: (record: Item) => ({
      disabled: record.status !== EventStatus.WAIT_FOR_CONFIRM,
    }),
  }

  return (
    <div className={Styles.root}>
      <Form form={form} component={false}>
        <Flex justify='space-between' flex='1 1 0%'>
          <Flex justify='space-between' flex='0.88 0.5 0%'>
            <Flex justify='space-between' flex='1 1 0%' className={Styles.selectWrapper}>
              <RangePicker
                value={store.timeRange}
                onChange={(val) => {
                  store.changeTimeRange(val)
                }}
                format={dateFormat}
                changeOnBlur
                showTime={{ format: 'HH:mm:ss' }}
              />
              <Select
                value={store.alarmType}
                placeholder='告警类型'
                style={{ width: 120 }}
                onChange={handleAlarmTypeChange}
                options={alarmTypeOptions}
              />
              <Select
                value={store.eventStatus}
                placeholder='事件状态'
                style={{ width: 120 }}
                onChange={handleEventStatusChange}
                options={eventStatusOptions}
              />
            </Flex>
          </Flex>
          <Flex justify='space-between' flex='0.12 0.5 0%'>
            <Button type='primary' className={Styles.primaryButton} onClick={handleSearchClick}>
              查询
            </Button>
            <Button onClick={handleResetClick}>重置</Button>
          </Flex>
        </Flex>
        {selectedRows.length > 0 ? (
          <Flex className={Styles.batchWrapper}>
            <Button type='primary' className={Styles.primaryButton} style={{ marginRight: '10px' }} onClick={handleBatchConfirm}>
              一键确认
            </Button>
            <Button type='primary' className={Styles.primaryButton} onClick={handleBatchCancel}>
              一键取消
            </Button>
          </Flex>
        ) : <div className={Styles.batchHolder} />}
        <Table
          bordered
          dataSource={store.alarmData}
          columns={columns}
          rowSelection={rowSelection}
          className={Styles.mainTable}
        />
      </Form>
    </div>
  )
}

export default observer(Content)
