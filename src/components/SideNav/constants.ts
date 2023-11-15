import {
  ControlOutlined,
  DashboardOutlined,
  FundViewOutlined,
  SettingOutlined,
  ThunderboltOutlined
} from '@ant-design/icons'

import {
  ROUTE_PATH_ALARM_MANAGEMENT,
  ROUTE_PATH_COMPARATIVE_ANALYSIS,
  ROUTE_PATH_CONSUMPTION_ANALYSIS,
  ROUTE_PATH_DASHBOARD,
  ROUTE_PATH_ELECTRICITY_DATA_MANAGEMENT,
  ROUTE_PATH_ENVIRONMENT_MANAGEMENT,
  ROUTE_PATH_EQUIPMENT_MANAGEMENT
} from '@/routes/routePath'

export enum NavKeys {
  dashboard = 'dashboard',
  dataSearch = 'dataSearch',
  electricityDataSearch = 'electricityDataSearch',
  environmentDataSearch = 'environmentDataSearch',
  consumptionManagement = 'consumptionManagement',
  consumptionAnalysis = 'consumptionAnalysis',
  comparativeAnalysis = 'comparativeAnalysis',
  alarmManagement = 'alarmManagement',
  equipmentManagement = 'equipmentManagement'
}

export const NavLabels = {
  [NavKeys.dashboard]: '统计看板',
  [NavKeys.dataSearch]: '数据查询',
  [NavKeys.electricityDataSearch]: '电力数据查询',
  [NavKeys.environmentDataSearch]: '环境数据查询',
  [NavKeys.consumptionManagement]: '能耗管理',
  [NavKeys.consumptionAnalysis]: '用能分析',
  [NavKeys.comparativeAnalysis]: '用能同环比',
  [NavKeys.alarmManagement]: '告警管理',
  [NavKeys.equipmentManagement]: '设备管理'
}

export interface INavMenus {
  label: React.ReactNode
  path?: string
  key: string
  IconCom?: React.FC
  children?: INavMenus[]
}

export const SideNavItems: INavMenus[] = [
  {
    key: NavKeys.dashboard,
    label: NavLabels[NavKeys.dashboard],
    path: ROUTE_PATH_DASHBOARD,
    IconCom: DashboardOutlined
  },
  {
    key: NavKeys.dataSearch,
    label: NavLabels[NavKeys.dataSearch],
    IconCom: ControlOutlined,
    children: [
      {
        key: NavKeys.electricityDataSearch,
        label: NavLabels[NavKeys.electricityDataSearch],
        path: ROUTE_PATH_ELECTRICITY_DATA_MANAGEMENT
      },
      {
        key: NavKeys.environmentDataSearch,
        label: NavLabels[NavKeys.environmentDataSearch],
        path: ROUTE_PATH_ENVIRONMENT_MANAGEMENT
      }
    ]
  },
  {
    key: NavKeys.consumptionManagement,
    label: NavLabels[NavKeys.consumptionManagement],
    IconCom: FundViewOutlined,
    children: [
      {
        key: NavKeys.consumptionAnalysis,
        label: NavLabels[NavKeys.consumptionAnalysis],
        path: ROUTE_PATH_CONSUMPTION_ANALYSIS
      },
      {
        key: NavKeys.comparativeAnalysis,
        label: NavLabels[NavKeys.comparativeAnalysis],
        path: ROUTE_PATH_COMPARATIVE_ANALYSIS
      }
    ]
  },
  {
    key: NavKeys.alarmManagement,
    label: NavLabels[NavKeys.alarmManagement],
    path: ROUTE_PATH_ALARM_MANAGEMENT,
    IconCom: SettingOutlined
  },
  {
    key: NavKeys.equipmentManagement,
    label: NavLabels[NavKeys.equipmentManagement],
    path: ROUTE_PATH_EQUIPMENT_MANAGEMENT,
    IconCom: ThunderboltOutlined
  }
]

export const LinkNavs = {
  [NavKeys.electricityDataSearch]: ROUTE_PATH_ELECTRICITY_DATA_MANAGEMENT,
  [NavKeys.environmentDataSearch]: ROUTE_PATH_ENVIRONMENT_MANAGEMENT,
  [NavKeys.consumptionAnalysis]: ROUTE_PATH_CONSUMPTION_ANALYSIS,
  [NavKeys.comparativeAnalysis]: ROUTE_PATH_COMPARATIVE_ANALYSIS,
  [NavKeys.alarmManagement]: ROUTE_PATH_ALARM_MANAGEMENT,
  [NavKeys.equipmentManagement]: ROUTE_PATH_EQUIPMENT_MANAGEMENT
}

export const defaultOpenKeys = [NavKeys.dashboard]
