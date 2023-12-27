import React, { useContext, useState } from 'react'

import { Button, Input, message, Modal, Table, Typography } from 'antd'
import dayjs from 'dayjs'

import { observer } from '@/hooks/storeHook'

import EditForm from './components/editForm'
import storeContext from './context'
import Styles from './index.module.scss'
import { GatewayItem } from './typings'

const columnNameMap: Record<string, string> = {
  order: '序号',
  gatewayName: '设备名称',
  gatewayNum: '设备编号',
  productModel: '设备型号',
  type: '设备类型',
  status: '设备状态',
  createTime: '添加时间',
  operations: '操作'
}

const gatewayStatusList = ['未使用', '已注册', '正常使用']

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
      case 'createTime':
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
      width: itemKey === 'operations' ? 130 : undefined,
      align: itemKey === 'operations' ? 'center' : ('left' as any),
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

  const handleProductModelChange = (e: any) => {
    store.changeProductModel(e?.target?.value)
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
        <EditForm gatewayItem={curGatewayItem} onClickBack={onClickBack} />
      ) : (
        <>
          <div className={Styles.toolbarWrapper}>
            设备编号：
            <Input
              style={{ width: 140 }}
              value={store.gatewayNum}
              onChange={handleGatewayNumChange}
              placeholder='请输入设备编号'
            />
            产品型号：
            <Input
              style={{ width: 140 }}
              value={store.productModel}
              onChange={handleProductModelChange}
              placeholder='请输入产品型号'
            />
            <Button
              type='primary'
              className={Styles.primaryButton}
              onClick={handleSearchClick}
            >
              查询
            </Button>
            <Button onClick={handleResetClick}>重置</Button>
          </div>
          <div className={Styles.secondToolBarWrapper}>
            <Button
              type='primary'
              className={Styles.primaryButton}
              onClick={handleAddClick}
            >
              新增
            </Button>
          </div>
          <Table
            size='small'
            dataSource={store.gatewayData}
            columns={columns}
            className={Styles.mainTable}
            pagination={store.pagination}
            onChange={({ current, pageSize }) => {
              actions.updatePagination({
                current: current as number,
                pageSize: pageSize as number
              })
            }}
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
