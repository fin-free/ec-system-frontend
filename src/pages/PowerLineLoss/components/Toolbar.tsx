import { useContext } from 'react'

import { Button, Radio, DatePicker, RadioChangeEvent, Select } from 'antd'
import type { Dayjs } from 'dayjs'
import { observer, useStore } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './Toolbar.module.scss'

const Toolbar: React.FC = () => {
  const {
    actions,
    store: { filters }
  } = useContext(storeContext)

  const onDateChange = (date: Dayjs | null) => {
    filters.datetime = date?.format('YYYY-MM-DD HH:mm:ss')!
  }

  const onDateTypeChange = (e: RadioChangeEvent) => {
    filters.datetype = e.target.value
  }

  const onClickSearch = () => {
    actions.getLossCompareData()
  }

  const handleEngrgyTypeChange = (value: string) => {
    filters.datatype = value
  }

  return (
    <div className={Styles.root}>
      <Select
        value={filters.datatype}
        placeholder='设备类型'
        onChange={handleEngrgyTypeChange}
        options={[
          { label: '电', value: '0002' },
          { label: '水', value: '0001' }
        ]}
      />
      <Radio.Group
        className={Styles.radioGroup}
        onChange={onDateTypeChange}
        defaultValue='day'
      >
        <Radio.Button value='0012'>按日</Radio.Button>
        <Radio.Button value='0013'>按月</Radio.Button>
      </Radio.Group>
      <DatePicker format={'YYYY-MM-DD'} onChange={onDateChange} />
      <Button
        className={Styles.searchBtn}
        type='primary'
        onClick={onClickSearch}
      >
        查询
      </Button>
    </div>
  )
}

export default observer(Toolbar)
