import {
  Table,
  Typography,
  Flex,
  Button,
  Input,
  Select,
  Modal,
  message
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import React, { useContext, useState } from 'react'
import { observer } from '@/hooks/storeHook'
import Styles from './index.module.scss'
import storeContext from './context'
import { GatewayItem } from './typings'
import EditForm from './components/editForm'

const columnNameMap: Record<string, string> = {
  gatewayId: '序号',
  gatewayName: '设备名称',
  gatewayNum: '设备地址',
  productModel: '设备型号',
  type: '设备类型',
  status: '设备状态',
  createTime: '添加时间',
  operations: '操作'
}

const gatewayStatusList = ['未使用', '已注册', '正常使用']

const gatewayStatusOptions = gatewayStatusList.map((item, index) => ({
  label: item,
  value: index
}))

const EnergyTypes = {
  //能源类型 11001 电表集中器  11002 水表集中器
  ELECTRIC: '11001',
  WATER: '11002'
}

const energyTypeMap = {
  [EnergyTypes.WATER]: '水表集中器',
  [EnergyTypes.ELECTRIC]: '电表集中器'
}

const Content: React.FC = () => {
  const { store, actions } = useContext(storeContext)
  const [showEditForm, setShowEditForm] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [curGatewayItem, setCurGatewayItem] = useState<GatewayItem>()
  const [messageApi, contextHolder] = message.useMessage()

  const handleAddClick = () => {
    setShowEditForm(true)
    setCurGatewayItem(undefined)
  }

  const onClickEdit = (record: GatewayItem) => {
    setShowEditForm(true)
    setCurGatewayItem(record)
  }

  const onClickDelete = (record: GatewayItem) => {
    setCurGatewayItem(record)
    setShowDeleteModal(true)
  }

  const getColumnsRender = (itemKey: string) => {
    switch (itemKey) {
      case 'operations':
        return (_: any, record: GatewayItem) => {
          return (
            <div className={Styles.operationWrapper}>
              <Typography.Link
                disabled={false}
                onClick={() => onClickEdit(record)}
              >
                编辑
              </Typography.Link>
              <Typography.Link
                disabled={false}
                onClick={() => onClickDelete(record)}
              >
                删除
              </Typography.Link>
            </div>
          )
        }
      case 'type':
        return (_: any, record: GatewayItem) => {
          return energyTypeMap[record.type]
        }
      case 'status':
        return (_: any, record: GatewayItem) => {
          return gatewayStatusList[record.status]
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
      ...(render ? { render } : null)
    }
  })

  const handleSearchClick = () => {
    actions.fetchGatewayData()
  }

  const handleResetClick = () => {
    actions.resetData()
  }

  const handleGatewayNumChange = (e: any) => {
    store.changeGatewayNum(e?.target?.value)
  }

  const handleGatewayStatusChange = (status: any) => {
    store.changeGatewayStatus(status)
  }

  const handleModalOk = async () => {
    const res = await actions.deleteGateway({
      gatewayId: curGatewayItem?.gatewayId
    })
    if (res) {
      messageApi.info('删除成功')
      actions.fetchGatewayData()
    }
    setShowDeleteModal(false)
  }

  const handleModalCancel = () => {
    setShowDeleteModal(false)
  }

  const onClickBack = () => {
    setCurGatewayItem(undefined)
    setShowEditForm(false)
  }

  return (
    <div className={Styles.root}>
      {contextHolder}
      {showEditForm ? (
        <>
          <Button
            className={Styles.primaryButton}
            onClick={onClickBack}
            shape='circle'
            icon={<ArrowLeftOutlined />}
          ></Button>
          <EditForm gatewayItem={curGatewayItem} />
        </>
      ) : (
        <>
          <Flex justify='space-between' flex='1 1 0%'>
            <Flex align='center' justify='flex-start' flex='0.4 0.5 0%'>
              <Flex align='center' flex='0.5 0.5 0%'>
                设备地址：
                <Flex align='center' flex='0.7 0.5 0%'>
                  <Input
                    value={store.gatewayNum}
                    onChange={handleGatewayNumChange}
                    placeholder='请输入设备地址'
                  />
                </Flex>
              </Flex>
              <Flex align='center' flex='0.5 0.5 0%'>
                设备状态：
                <Select
                  value={store.gatewayStatus}
                  placeholder='请选择设备状态'
                  style={{ width: 120 }}
                  onChange={handleGatewayStatusChange}
                  options={gatewayStatusOptions}
                />
              </Flex>
            </Flex>
            <Flex justify='space-between' flex='0.2 0.5 0%'>
              <Button
                type='primary'
                className={Styles.primaryButton}
                onClick={handleSearchClick}
              >
                查询
              </Button>
              <Button onClick={handleResetClick}>重置</Button>
              <Button
                type='primary'
                className={Styles.primaryButton}
                onClick={handleAddClick}
              >
                新增
              </Button>
            </Flex>
          </Flex>
          <Table
            bordered
            dataSource={store.gatewayData}
            columns={columns}
            className={Styles.mainTable}
          />
          <Modal
            title='确认删除设备'
            open={showDeleteModal}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
          >
            是否删除 {curGatewayItem?.gatewayName} 设备?
          </Modal>
        </>
      )}
    </div>
  )
}

export default observer(Content)
