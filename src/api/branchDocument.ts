import request from './request'

type archiveType = {
  archivesLevel?: number
  archivesId?: number
  archivesName: string
  parentId: number
  projectId: string //项目Id
}

const addArchive = async (params: archiveType) => {
  const { archivesLevel, parentId, archivesName } = params
  try {
    const res = await request({
      url: '/sys-archives/add',
      method: 'POST',
      data: {
        archivesLevel,
        parentId,
        archivesName,
        projectId: '1'
      }
    })
    const { code, data, message } = res ?? {}
    if (code === 200 && data) {
      return message
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('addArchive error: ', error)
  }
}

const updateArchive = async (params: archiveType) => {
  try {
    const res = await request({
      url: '/sys-archives/update',
      method: 'POST',
      data: params
    })
    const { code, data, message } = res ?? {}
    if (code === 200 && data) {
      return data
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('updateArchive error: ', error)
  }
}

const deleteArchive = async (params: archiveType) => {
  const { archivesId, archivesName } = params
  try {
    const res = await request({
      url: `sys-archives/delete?archivesId=${archivesId}`,
      method: 'DELETE',
      data: {
        archivesId,
        projectId: '1',
        archivesName
      }
    })
    const { code, data, message } = res ?? {}
    if (code === 200) {
      return data
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('deleteArchive error: ', error)
  }
}

const getArchiveTree = async (params: any) => {
  const { projectId } = params
  try {
    const res = await request({
      url: `energy/archives/tree?projectId=${projectId}`,
      method: 'GET'
    })
    const { code, data, message } = res ?? {}
    if (code === 200 && data) {
      return data
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('getarchiveTree error: ', error)
  }
}

const getEnergyList = async (params: any) => {
  const { energyType, projectId, archivesId } = params
  try {
    const res = await request({
      url: `sys-archives/matching/equipment/list`,
      method: 'POST',
      data: {
        energyType,
        projectId,
        archivesId
      }
    })
    const { code, data, message } = res ?? {}
    if (code === 200 && data) {
      return data
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('getEnergyList error: ', error)
  }
}

const saveArchivesEquipmentRelation = async (params: any) => {
  const { meterIdList, archivesId } = params
  try {
    const res = await request({
      url: `sys-archives-equipment-relation/add`,
      method: 'POST',
      data: {
        archivesId,
        meterIdList
      }
    })
    const { code, data, message } = res ?? {}
    if (code === 200 && data) {
      return data
    } else {
      throw new Error(message)
    }
  } catch (error) {
    console.error('saveArchivesEquipmentRelation error: ', error)
  }
}

export {
  addArchive,
  updateArchive,
  deleteArchive,
  getArchiveTree,
  getEnergyList,
  saveArchivesEquipmentRelation
}
