export interface ChartData {
  archivesId?: number
  archivesName?: string
  list?: {
    clearingPeriod: string
    energyValue: number
    proportion: number
  }[]
}
