import { Form, Table, Typography, Flex, Button, Input, Select } from 'antd';
import React, { useContext, useState } from 'react';
import { observer } from '@/hooks/storeHook'
import Styles from './index.module.scss'
import storeContext from './context';
import { EquipmentItem } from './typings';

const columnNameMap: Record<string, string> = {
  orderId: '序号',
  equipmentName: '设备名称',
  equipmentAddress: '设备地址',
  equipmentModel: '设备型号',
  equipmentType: '设备类型',
  equipmentStatus: '设备状态',
  equipmentAddedAt: '添加时间',
  operations: '操作',
}

const equipmentStatusOptions = ['正常使用', '已注册', '未使用'].map((item, index) =>({
  label: item,
  value: index
}));

const Content: React.FC = () => {
  const {store, actions} = useContext(storeContext);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  const handleAddClick = () => {
    setShowEditForm(true);
  }

  const onClickEdit = (record: EquipmentItem) => {
    console.log(record);
  }

  const onClickCancel= (record: EquipmentItem) => {
    console.log(record);
  }

  const handleEquipmentStatusChange = () => {

  }

  const getColumnsRender = (itemKey: string) => {
    switch (itemKey) {
      case 'operations':
        return (_: any, record: EquipmentItem) => {
          return (
            <div className={Styles.operationWrapper}>
              <Typography.Link disabled={false} onClick={() => onClickEdit(record)}>
                编辑
              </Typography.Link>
              <Typography.Link disabled={false} onClick={() => onClickCancel(record)}>
                删除
            </Typography.Link>
          </div>
          );
        };
      default:
        return null;
    }
  }

  const onFormFinish = (data: any) => {
    setShowEditForm(false);
  }

  const columns = Object.keys(columnNameMap).map((itemKey) => {
    const render = getColumnsRender(itemKey);
    return {
      title: columnNameMap[itemKey],
      dataIndex: itemKey,
      ... render ? {render}: null,
    }
  })

  return (
    <div className={Styles.root}>
      {showEditForm ?
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{width: 800, alignSelf: 'flex-start', marginTop: 20}}
          onFinish={onFormFinish}
          autoComplete="off"
        >
          <Form.Item
            label="设备类型"
            name="equipmentType"
            rules={[{ required: true, message: '请输入设备类型！' }]}
          >
            <Input />
          </Form.Item>
      
          <Form.Item
            label="设备编号"
            name="equipmentNum"
            rules={[{ required: true, message: '请输入设备编码！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="产品型号"
            name="equipmentModel"
            rules={[{ required: true, message: '请输入产品型号！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="设备状态"
            name="password"
            rules={[{ required: true, message: '请输入设备状态！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="电压上限"
            name="volUpperLimit"
          >
            <Input />
          </Form.Item>
      
          <Form.Item
            label="电流上限"
            name="curUpperLimit"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="最大功率"
            name="maxPower"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="最大温度"
            name="maxTemperature"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="最大湿度"
            name="maxHumidity"
          >
            <Input />
          </Form.Item>
      
          <Form.Item wrapperCol={{ offset: 8, span: 32 }}>
            <Button size='large' className={Styles.primaryButton} style={{width: 100}} type="primary" htmlType="submit">
              提交
            </Button>
            <Button size='large' htmlType="submit" style={{marginLeft: 20, width: 100}}>
              重置
            </Button>
          </Form.Item>
        </Form>
      :
        <React.Fragment>
          <Flex justify='space-between' flex='1 1 0%'>
            <Flex align='center' justify='flex-start' flex='0.4 0.5 0%'>
              <Flex align='center' flex='0.5 0.5 0%'>
                设备地址：
                <Flex align='center' flex='0.7 0.5 0%'>
                  <Input />
                </Flex>
              </Flex>
              <Flex align='center' flex='0.5 0.5 0%'>
                设备状态：
                <Select 
                  value={store.equipmentStatus}
                  placeholder="请选择设备状态"
                  style={{ width: 120 }}
                  onChange={handleEquipmentStatusChange}
                  options={equipmentStatusOptions} 
                />
              </Flex>
            </Flex>
            <Flex justify='flex-end' flex='0.5 0.5 0%'>
              <Button type='primary' className={Styles.primaryButton} onClick={handleAddClick}>
                新增
              </Button>
            </Flex>
          </Flex>
          <Table
            bordered
            dataSource={store.equipmentData}
            columns={columns}
            className={Styles.mainTable}
          />
        </React.Fragment>
      }
    </div>
  );
};

export default observer(Content)

