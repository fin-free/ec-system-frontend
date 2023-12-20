import { Form, Button, Input, message, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { observer } from '@/hooks/storeHook'
import Styles from '../index.module.scss'
import storeContext from '../context'

interface IProps {
  archievesItem: any
}

const archivesLevelMap = ['项目', '小区', '楼栋', '单元', '楼层', '房间']

const defaultArchivesLevelOptions = archivesLevelMap.map((item, index) => ({
  label: item,
  value: index + 1
}))

const levelMapping = [[], [1, 2], [2, 3], [3, 4], [4], [5]]

const EditForm: React.FC<IProps> = (props: IProps) => {
  const { archievesItem } = props
  const { actions, store } = useContext(storeContext)
  const [archivesLevelOptions, setArchivesLevelOptions] = useState(
    defaultArchivesLevelOptions
  )
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()
  useEffect(() => {
    console.log(archievesItem)
    form.setFieldValue('parentName', archievesItem.parentName)
    form.setFieldValue('archivesName', archievesItem.archivesName)
    if (store.treeMode === 'edit') {
      form.setFieldValue('archivesLevel', archievesItem.archivesLevel)
    }
  }, [archievesItem])
  const onFormFinish = async (data: any) => {
    const res = archievesItem.archivesId
      ? await actions.updateArchive({
          ...data,
          archivesId: archievesItem.archivesId
        })
      : await actions.addArchives({ ...data, parentId: archievesItem.parentId })
    if (res) {
      messageApi.info(res)
      setTimeout(() => {
        actions.updateCurArchivesItem(null)
      }, 500)
    }
  }

  useEffect(() => {
    if (archievesItem && archievesItem.archivesLevel) {
      const toShowLevels = levelMapping[archievesItem.archivesLevel]
      setArchivesLevelOptions(
        defaultArchivesLevelOptions.filter((option, index) =>
          toShowLevels.includes(index)
        )
      )
    }
  }, [archievesItem])

  const onClickCancel = () => {
    actions.updateCurArchivesItem(null)
    actions.updateTreeMode('')
  }

  return (
    <>
      {contextHolder}
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          width: 500,
          padding: 50
        }}
        onFinish={onFormFinish}
        autoComplete='off'
        form={form}
      >
        <Form.Item
          label='档案级别'
          name='archivesLevel'
          rules={[{ required: true, message: '请输入档案级别！' }]}
        >
          <Select
            disabled={store.treeMode === 'edit'}
            options={archivesLevelOptions}
          />
        </Form.Item>
        <Form.Item
          label='上级档案'
          name='parentName'
          rules={[{ required: true, message: '请输入上级档案！' }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label='档案名称'
          name='archivesName'
          rules={[{ required: true, message: '请输入档案名称！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 32 }}>
          <Button
            size='large'
            className={Styles.primaryButton}
            style={{ width: 100 }}
            onClick={onClickCancel}
          >
            取消
          </Button>
          <Button
            size='large'
            type='primary'
            htmlType='submit'
            style={{ marginLeft: 20, width: 100 }}
          >
            保存
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default observer(EditForm)
