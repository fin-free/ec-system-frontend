import { useContext } from 'react'

import { DatePicker, Select } from 'antd'

import { useStore } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './Toolbar.module.scss'

const Toolbar: React.FC = () => {
  const {
    commonStore: { dataTypeOptions }
  } = useStore()
  const {
    store: { filterDate, filterDataType }
  } = useContext(storeContext)

  const onDateChange = () => {}

  const onDataTypeChange = () => {}

  return (
    <div className={Styles.root}>
      <DatePicker defaultValue={filterDate} format={'YYYY-MM-DD'} onChange={onDateChange} />
      <Select options={dataTypeOptions} defaultValue={filterDataType} onChange={onDataTypeChange} />
    </div>
  )
}

export default Toolbar
