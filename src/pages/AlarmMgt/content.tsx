import React, { useContext, useState } from 'react'

import {
  Button,
  DatePicker,
  Form,
  Modal,
  Select,
  Table,
  Typography,
  message
} from 'antd'
import dayjs from 'dayjs'

import { observer } from '@/hooks/storeHook'

import storeContext from './context'
import Styles from './index.module.scss'
import { Item } from './typings'

const EventStatus = {
  ALL: -1,
  WAIT_FOR_CONFIRM: 0,
  CONFIRMED: 1,
  CANCELLED: 2
}

const eventStatusMap = {
  [EventStatus.ALL]: '全部',
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

const alarmType = [
  '全部',
  '过压告警',
  '过流告警',
  '超功率告警',
  '温度告警',
  '湿度告警',
  '集中器掉线'
]
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
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showBatchConfirmModal, setShowBatchConfirmModal] = useState(false)
  const [showBatchCancelModal, setShowBatchCancelModal] = useState(false)
  const [curRecord, setCurRecord] = useState<Item>()
  const { store, actions } = useContext(storeContext)
  const dateFormat = 'YYYY/MM/DD'

  const onClickCancel = (record: Item) => {
    setCurRecord(record)
    setShowCancelModal(true)
  }

  const onClickConfirm = (record: Item) => {
    setCurRecord(record)
    setShowConfirmModal(true)
  }

  const onOkConfirmModal = async () => {
    const res = await actions.operateAlarm(
      [curRecord?.alarmId as number],
      EventStatus.CONFIRMED
    )
    setCurRecord(undefined)
    setShowConfirmModal(false)
    if (res) {
      message.success('确认成功')
    } else {
      message.error('确认失败')
    }
  }

  const onOkCancelModal = async () => {
    const res = await actions.operateAlarm(
      [curRecord?.alarmId as number],
      EventStatus.CANCELLED
    )

    setCurRecord(undefined)
    setShowCancelModal(false)
    if (res) {
      message.success('取消成功')
    } else {
      message.error('取消失败')
    }
  }

  const onCancelConfirmModal = () => {
    setShowConfirmModal(false)
  }

  const onCancelCancelModal = () => {
    setShowCancelModal(false)
  }

  const handleBatchConfirm = () => {
    setShowBatchConfirmModal(true)
  }

  const onOkBatchConfrimModal = async () => {
    actions.operateAlarm(selectedRows, EventStatus.CONFIRMED)
    setShowBatchConfirmModal(false)
    setSelectedRows([])
  }

  const onOkBatchCancelModal = async () => {
    actions.operateAlarm(selectedRows, EventStatus.CANCELLED)
    setShowBatchCancelModal(false)
    setSelectedRows([])
  }

  const onCancelBatchConfirmModal = () => {
    setShowBatchConfirmModal(false)
  }

  const onCancelBatchCancelModal = () => {
    setShowBatchCancelModal(false)
  }

  const handleBatchCancel = () => {
    setShowBatchCancelModal(true)
  }

  const handleEventStatusChange = (e: number) => {
    actions.changeEventStatus(e)
    actions.fetchData()
  }

  const handleAlarmTypeChange = (e: number) => {
    actions.changeAlarmType(e)
    actions.fetchData()
  }

  const handleDateChange = (val: any) => {
    actions.changeTimeRange(val)
    actions.fetchData()
  }

  const getColumnsRender = (itemKey: string) => {
    switch (itemKey) {
      case 'operations':
        return (_: any, record: Item) => {
          return record.status === EventStatus.WAIT_FOR_CONFIRM ? (
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
      case 'startTime':
        return (value: any) =>
          value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '--'
      default:
        return null
    }
  }

  const columns = Object.keys(columnNameMap).map((itemKey) => {
    const render = getColumnsRender(itemKey)
    return {
      title: columnNameMap[itemKey],
      dataIndex: itemKey,
      align: itemKey === 'operations' ? 'center' : ('left' as any),
      width: itemKey === 'operations' ? 130 : undefined,
      ...(itemKey === 'alarmDetail' ? { ellipsis: true } : null),
      ...(render ? { render } : null)
    }
  })

  const rowSelection = {
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRows(newSelectedRowKeys)
    },
    getCheckboxProps: (record: Item) => ({
      disabled: record.status !== EventStatus.WAIT_FOR_CONFIRM
    })
  }

  return (
    <div className={Styles.root}>
      <Form form={form} component={false}>
        <div className={Styles.toolbarWrapper}>
          <div className='filters'>
            <RangePicker
              value={store.timeRange}
              onChange={handleDateChange}
              format={dateFormat}
              changeOnBlur
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
          </div>
          <div className='actions'>
            <Button
              disabled={selectedRows.length === 0}
              type='primary'
              className={Styles.primaryButton}
              onClick={handleBatchConfirm}
            >
              一键确认
            </Button>
            <Button
              disabled={selectedRows.length === 0}
              type='primary'
              className={Styles.primaryButton}
              onClick={handleBatchCancel}
            >
              一键取消
            </Button>
          </div>
        </div>

        <div className={Styles.tableWrapper}>
          <Table
            size='small'
            dataSource={store.alarmData}
            columns={columns}
            rowSelection={rowSelection}
            pagination={store.pagination}
            onChange={({ current, pageSize }) => {
              actions.updatePagination({
                current: current as number,
                pageSize: pageSize as number
              })
            }}
          />
        </div>
      </Form>
      <Modal
        title='确认告警？'
        open={showConfirmModal}
        onOk={onOkConfirmModal}
        onCancel={onCancelConfirmModal}
      >
        设备编号：{curRecord?.equipmentNum}
      </Modal>
      <Modal
        title='取消告警？'
        open={showCancelModal}
        onOk={onOkCancelModal}
        onCancel={onCancelCancelModal}
      >
        设备编号：{curRecord?.equipmentNum}
      </Modal>
      <Modal
        title='一键确认告警？'
        open={showBatchConfirmModal}
        onOk={onOkBatchConfrimModal}
        onCancel={onCancelBatchConfirmModal}
      ></Modal>
      <Modal
        title='一键取消告警？'
        open={showBatchCancelModal}
        onOk={onOkBatchCancelModal}
        onCancel={onCancelBatchCancelModal}
      ></Modal>
    </div>
  )
}

export default observer(Content)
