import { useContext } from 'react'

import { Table } from 'antd'

import { observer } from '@/hooks/storeHook'

import storeContext from '../context'

import Styles from './DataTable.module.scss'

const DataTable: React.FC = () => {
  const {
    actions,
    store: { electricityTableData, pagination, filters }
  } = useContext(storeContext)

  /**
   * 组合有功 0021
   * 电流 0022
   * 电压 0023
   * 有功功率 0024
   * 功率因数 0025
   */
  const columns: any = {
    '0021': [
      { title: '序号', dataIndex: 'orderNum', width: 100 },
      { title: '回路名称', dataIndex: 'equipmentName' },
      { title: '设备地址', dataIndex: 'equipmentNum' },
      { title: '冻结时间', dataIndex: 'dataItemValueTime' },
      { title: '总', dataIndex: 'dataItemValue' },
      { title: '尖', dataIndex: 'dataItemValueOne' },
      { title: '峰', dataIndex: 'dataItemValueTwo' },
      { title: '平', dataIndex: 'dataItemValueThree' },
      { title: '谷', dataIndex: 'dataItemValueFour' },
      { title: '倍率', dataIndex: 'voltage' },
      { title: '状态', dataIndex: 'collectStatus' }
    ],
    '0022': [
      { title: '序号', dataIndex: 'orderNum', width: 100 },
      { title: '回路名称', dataIndex: 'equipmentName' },
      { title: '设备地址', dataIndex: 'equipmentNum' },
      { title: '冻结时间', dataIndex: 'dataItemValueTime' },
      { title: 'Ia', dataIndex: 'currentPhaseA' },
      { title: 'Ib', dataIndex: 'currentPhaseB' },
      { title: 'Ic', dataIndex: 'currentPhaseC' },
      { title: '状态', dataIndex: 'collectStatus' }
    ],
    '0023': [
      { title: '序号', dataIndex: 'orderNum', width: 100 },
      { title: '回路名称', dataIndex: 'equipmentName' },
      { title: '设备地址', dataIndex: 'equipmentNum' },
      { title: '冻结时间', dataIndex: 'dataItemValueTime' },
      { title: 'Ua', dataIndex: 'voltagePhaseA' },
      { title: 'Ub', dataIndex: 'voltagePhaseB' },
      { title: 'Uc', dataIndex: 'voltagePhaseC' },
      { title: '状态', dataIndex: 'collectStatus' }
    ],
    '0024': [
      { title: '序号', dataIndex: 'orderNum', width: 100 },
      { title: '回路名称', dataIndex: 'equipmentName' },
      { title: '设备地址', dataIndex: 'equipmentNum' },
      { title: '冻结时间', dataIndex: 'dataItemValueTime' },
      { title: 'P总(kW)', dataIndex: 'activePowerPhaseTotal' },
      { title: 'PA(kW)', dataIndex: 'activePowerPhaseA' },
      { title: 'PB(kW)', dataIndex: 'activePowerPhaseB' },
      { title: 'PC(kW)', dataIndex: 'activePowerPhaseC' },
      { title: '状态', dataIndex: 'collectStatus' }
    ],
    '0025': [
      { title: '序号', dataIndex: 'orderNum', width: 100 },
      { title: '回路名称', dataIndex: 'equipmentName' },
      { title: '设备地址', dataIndex: 'equipmentNum' },
      { title: '冻结时间', dataIndex: 'dataItemValueTime' },
      { title: 'PF', dataIndex: 'powerFactorAvg' },
      { title: 'PFA', dataIndex: 'powerFactorPhaseA' },
      { title: 'PFB', dataIndex: 'powerFactorPhaseB' },
      { title: 'PFC', dataIndex: 'powerFactorPhaseC' },
      { title: '状态', dataIndex: 'collectStatus' }
    ]
  }

  return (
    <Table
      className={Styles.root}
      columns={columns[filters.functiontype]}
      dataSource={electricityTableData}
      pagination={pagination}
      onChange={({ current, pageSize }) => {
        actions.updatePagination({ current: current as number, pageSize: pageSize as number })
      }}
    />
  )
}

export default observer(DataTable)
