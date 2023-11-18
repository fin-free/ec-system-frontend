import { Form, Table, Typography, DatePicker, Flex, Select, Button } from 'antd';
import React, { useContext, useState } from 'react';
import type { Dayjs } from 'dayjs';
import { observer } from '@/hooks/storeHook'
import Styles from './index.module.scss'
import storeContext from './context';
import { Item } from './typings';

type RangeValue = [Dayjs | null, Dayjs | null] | null;

const EventStatus = {
  WAIT_FOR_CONFIRM: 0,
  CONFIRMED: 1,
  CANCELLED: 2
}

const eventStatusMap = {
  [EventStatus.WAIT_FOR_CONFIRM]: '待确认',
  [EventStatus.CONFIRMED]: '已确认',
  [EventStatus.CANCELLED]: '已取消'
}

const { RangePicker } = DatePicker;

const columnNameMap: Record<string, string> = {
  alarmType: '告警类型',
  equipment: '设备',
  gatewayAddress: '网关地址',
  alarmDetail: '告警详情',
  eventStatus: '事件状态',
  createdTime: '发生时间',
  operations: '操作',
}

const alarmType = ['全部', '过压告警', '过流告警', '超功率告警', '温度告警', '湿度告警'];
const alarmTypeOptions = alarmType.map((item, index) =>({
  label: item,
  value: index
}));

const eventStatusOptions = Object.values(EventStatus).map((status) => ({
  label: eventStatusMap[status],
  value: status,
}))

const Content: React.FC = () => {
  const [form] = Form.useForm();
  const [dates, setDates] = useState<RangeValue>(null);
  const [dateValue, setDateValue] = useState<RangeValue>(null);
  const [hasSelected, setHasSelected] = useState<boolean>(false);
  const {store, actions} = useContext(storeContext);

  const onClickCancel = (record: Item) => {
    console.log('record: ', record);
  };

  const onClickConfirm = (record: Item) => {
    console.log('record: ', record);
  }

  const handleEventStatusChange = (e: number) => {
    store.changeEventStatus(e);
  }

  const handleAlarmTypeChange = (e: number) => {
    store.changeAlarmType(e);
  }

  const handleSearchClick = () => {
    actions.fetchData();
  }

  const handleResetClick = () => {
    actions.resetData();
  }

  const getColumnsRender = (itemKey: string) => {
    switch (itemKey) {
      case 'operations':
        return (_: any, record: Item) => {
          return (
            record.eventStatus === EventStatus.WAIT_FOR_CONFIRM ? 
            <div className={Styles.operationWrapper}>
              <Typography.Link disabled={false} onClick={() => onClickConfirm(record)}>
                确认
              </Typography.Link>
              <Typography.Link disabled={false} onClick={() => onClickCancel(record)}>
                取消
            </Typography.Link>
          </div> : undefined
          );
        };
      case 'alarmType': 
        return (_: any, record: Item) => {
          return alarmType[record.alarmType]
        };
      case 'eventStatus': 
        return (_: any, record: Item) => {
          return eventStatusMap[record.eventStatus]
        };
      default:
        return null;
    }
  }

  const columns = Object.keys(columnNameMap).map((itemKey) => {
    const render = getColumnsRender(itemKey);
    return {
      title: columnNameMap[itemKey],
      dataIndex: itemKey,
      ... render ? {render}: null,
    }
  })

  const rowSelection = {
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setHasSelected(newSelectedRowKeys.length > 0);
      console.log('newSelectedRowKeys: ', newSelectedRowKeys);
    },
  }

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  return (
    <div className={Styles.root}>
      <Form form={form} component={false}>
      <Flex justify="space-between" flex='1 1 0%'>
          <Flex justify='space-between' flex='0.88 0.5 0%'>
            <Flex justify='space-between' flex='1 1 0%' className={Styles.selectWrapper}>
              <RangePicker
                value={dates || dateValue}
                onCalendarChange={(val) => {
                  setDates(val);
                }}
                onChange={(val) => {
                  setDateValue(val);
                }}
                onOpenChange={onOpenChange}
                changeOnBlur
              />
              <Select
                value={store.alarmType}
                placeholder="告警类型"
                style={{ width: 120 }}
                onChange={handleAlarmTypeChange}
                options={alarmTypeOptions}
              />
              <Select
                value={store.eventStatus}
                placeholder="事件状态"
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
            <Button onClick={handleResetClick}>
              重置
            </Button>
          </Flex>
        </Flex>
      {hasSelected ? <Flex className={Styles.batchWrapper}>
        <Button type='primary' className={Styles.primaryButton} style={{marginRight: '10px'}}>
          一键确认
        </Button>
        <Button type='primary' className={Styles.primaryButton}>
          一键取消
        </Button>
      </Flex>: null}
        <Table
          bordered
          dataSource={store.alarmData}
          columns={columns}
          rowSelection={rowSelection}
          className={Styles.mainTable}
        />
      </Form>
    </div>
  );
};

export default observer(Content)

