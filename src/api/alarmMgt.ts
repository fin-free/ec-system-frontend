import request from './request'

const getAlarmList = async (params: any): Promise<any> => {
  const { status, type, startTime, pageNum, pageSize, endTime } = params
  try {
    const res = await request({
      url: `/energy/alarm/list?projectId=1&status=${status}&type=${type}&startTime=${startTime}&pageNum=${pageNum}&pageSize=${pageSize}&endTime=${endTime}`
    })
    const { code, data, message } = res ?? {}
    if (code === 200 && data) {
      return data
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('getAlarmList error: ', error)
  }
}

const operateAlarm = async (params: any) => {
  const { alarmIds, operation } = params
  try {
    const res = await request({
      url: `/energy/alarm/operate`,
      method: 'POST',
      data: {
        alarmIds,
        status: operation //1 确认  2 取消
      }
    })
    const { code, data, message } = res ?? {}
    if (code === 200) {
      return data
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('operateAlarm error: ', error)
  }
}
export { getAlarmList, operateAlarm }
