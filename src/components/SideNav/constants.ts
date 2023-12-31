import {
  AimOutlined,
  ControlOutlined,
  DashboardOutlined,
  FundViewOutlined,
  SettingOutlined,
  ThunderboltOutlined
} from '@ant-design/icons'

import {
  ROUTE_PATH_AI_MONITORING,
  ROUTE_PATH_ALARM_LIST,
  ROUTE_PATH_ALARM_MANAGEMENT,
  ROUTE_PATH_BRANCH_DOCUMENT,
  ROUTE_PATH_COMPARATIVE_ANALYSIS,
  ROUTE_PATH_CONSUMPTION_ANALYSIS,
  ROUTE_PATH_DASHBOARD,
  ROUTE_PATH_ELECTRICITY_DATA_MANAGEMENT,
  ROUTE_PATH_EQUIPMENT_LIST,
  ROUTE_PATH_EQUIPMENT_MANAGEMENT,
  ROUTE_PATH_GATEWAY_LIST,
  ROUTE_PATH_LINE_COMPARISON,
  ROUTE_PATH_POWER_LINE_LOSS,
  ROUTE_PATH_TEMPERATURE_MANAGEMENT,
  ROUTE_PATH_WATER_MANAGEMENT
} from '@/routes/routePath'

export enum NavKeys {
  dashboard = 'dashboard',
  dataSearch = 'dataSearch',
  electricityDataSearch = 'electricityDataSearch',
  temperatureDataSearch = 'temperatureDataSearch',
  waterDataSearch = 'waterDataSearch',
  consumptionManagement = 'consumptionManagement',
  consumptionAnalysis = 'consumptionAnalysis',
  comparativeAnalysis = 'comparativeAnalysis',
  alarmManagement = 'alarmManagement',
  aiMonitoring = 'aiMonitoring',
  equipmentManagement = 'equipmentManagement',
  alarmList = 'alarmList',
  equipmentList = 'equipmentList',
  gatewayList = 'gatewayList',
  lineComparison = 'lineComparision',
  powerLineLoss = 'powerLineLoss',
  branchDocument = 'branchDocument'
}

export const NavLabels = {
  [NavKeys.dashboard]: '统计看板',
  [NavKeys.dataSearch]: '数据查询',
  [NavKeys.electricityDataSearch]: '用电数据查询',
  [NavKeys.temperatureDataSearch]: '温湿度数据查询',
  [NavKeys.waterDataSearch]: '用水数据查询',
  [NavKeys.consumptionManagement]: '能耗管理',
  [NavKeys.consumptionAnalysis]: '用能分析',
  [NavKeys.comparativeAnalysis]: '用能同环比',
  [NavKeys.alarmManagement]: '告警管理',
  [NavKeys.alarmList]: '告警列表',
  [NavKeys.equipmentManagement]: '设备管理',
  [NavKeys.equipmentList]: '设备列表',
  [NavKeys.gatewayList]: '网关列表',
  [NavKeys.branchDocument]: '支路档案',
  [NavKeys.lineComparison]: '线路对比',
  [NavKeys.powerLineLoss]: '线路损耗',
  [NavKeys.aiMonitoring]: 'AI电力监测'
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
        key: NavKeys.waterDataSearch,
        label: NavLabels[NavKeys.waterDataSearch],
        path: ROUTE_PATH_WATER_MANAGEMENT
      },
      {
        key: NavKeys.temperatureDataSearch,
        label: NavLabels[NavKeys.temperatureDataSearch],
        path: ROUTE_PATH_TEMPERATURE_MANAGEMENT
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
      },
      {
        key: NavKeys.lineComparison,
        label: NavLabels[NavKeys.lineComparison],
        path: ROUTE_PATH_LINE_COMPARISON
      },
      {
        key: NavKeys.powerLineLoss,
        label: NavLabels[NavKeys.powerLineLoss],
        path: ROUTE_PATH_POWER_LINE_LOSS
      },
      {
        key: NavKeys.branchDocument,
        label: NavLabels[NavKeys.branchDocument],
        path: ROUTE_PATH_BRANCH_DOCUMENT
      }
    ]
  },
  {
    key: NavKeys.alarmManagement,
    label: NavLabels[NavKeys.alarmManagement],
    IconCom: SettingOutlined,
    children: [
      {
        key: NavKeys.alarmList,
        label: NavLabels[NavKeys.alarmList],
        path: ROUTE_PATH_ALARM_LIST
      }
    ]
  },
  {
    key: NavKeys.equipmentManagement,
    label: NavLabels[NavKeys.equipmentManagement],
    IconCom: ThunderboltOutlined,
    children: [
      {
        key: NavKeys.equipmentList,
        label: NavLabels[NavKeys.equipmentList],
        path: ROUTE_PATH_EQUIPMENT_LIST
      },
      {
        key: NavKeys.gatewayList,
        label: NavLabels[NavKeys.gatewayList],
        path: ROUTE_PATH_GATEWAY_LIST
      }
    ]
  },
  {
    key: NavKeys.aiMonitoring,
    label: NavLabels[NavKeys.aiMonitoring],
    IconCom: AimOutlined,
    path: ROUTE_PATH_AI_MONITORING
  }
]

export const LinkNavs = {
  [NavKeys.dashboard]: ROUTE_PATH_DASHBOARD,
  [NavKeys.electricityDataSearch]: ROUTE_PATH_ELECTRICITY_DATA_MANAGEMENT,
  [NavKeys.temperatureDataSearch]: ROUTE_PATH_TEMPERATURE_MANAGEMENT,
  [NavKeys.waterDataSearch]: ROUTE_PATH_WATER_MANAGEMENT,
  [NavKeys.consumptionAnalysis]: ROUTE_PATH_CONSUMPTION_ANALYSIS,
  [NavKeys.comparativeAnalysis]: ROUTE_PATH_COMPARATIVE_ANALYSIS,
  [NavKeys.alarmManagement]: ROUTE_PATH_ALARM_MANAGEMENT,
  [NavKeys.equipmentManagement]: ROUTE_PATH_EQUIPMENT_MANAGEMENT,
  [NavKeys.lineComparison]: ROUTE_PATH_LINE_COMPARISON,
  [NavKeys.powerLineLoss]: ROUTE_PATH_POWER_LINE_LOSS,
  [NavKeys.branchDocument]: ROUTE_PATH_BRANCH_DOCUMENT,
  [NavKeys.alarmList]: ROUTE_PATH_ALARM_LIST,
  [NavKeys.equipmentList]: ROUTE_PATH_EQUIPMENT_LIST,
  [NavKeys.gatewayList]: ROUTE_PATH_GATEWAY_LIST,
  [NavKeys.aiMonitoring]: ROUTE_PATH_AI_MONITORING
}

export const defaultOpenKeys = [NavKeys.dashboard]
