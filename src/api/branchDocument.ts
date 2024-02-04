import request from './request'

type archiveType = {
  archivesLevel?: number
  archivesId?: number
  archivesName: string
  parentId: number
  projectId: string //项目Id
}

const addArchive = async (params: archiveType) => {
  const { archivesLevel, parentId, archivesName, projectId } = params
  try {
    const res = await request({
      url: '/sys-archives/add',
      method: 'POST',
      data: {
        archivesLevel,
        parentId,
        archivesName,
        projectId
      }
    })
    const { code, message } = res ?? {}
    return {
      code,
      message
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
    const { code, message } = res ?? {}
    return {
      code,
      message
    }
  } catch (error) {
    console.error('updateArchive error: ', error)
  }
}

const deleteArchive = async (params: archiveType) => {
  const { archivesId } = params
  try {
    const res = await request({
      url: `sys-archives/delete?archivesId=${archivesId}`,
      method: 'DELETE'
    })
    const { code, message } = res ?? {}

    return {
      code,
      message
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

const getEnergyList = async (params: { projectId: string; datatype: string; archivesId: number }) => {
  const { datatype, projectId, archivesId } = params
  try {
    const res = await request({
      url: 'sys-archives/matching/equipment/list',
      method: 'POST',
      data: {
        datatype,
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
  const { meterIdList, archivesId, energyType } = params
  try {
    const res = await request({
      url: 'sys-archives-equipment-relation/add',
      method: 'POST',
      data: {
        archivesId,
        meterIdList,
        energyType
      }
    })
    const { code, data, message } = res ?? {}
    if (code === 200 && data) {
      return message
    } else {
      return null
    }
  } catch (error) {
    console.error('saveArchivesEquipmentRelation error: ', error)
  }
}

export { addArchive, deleteArchive, getArchiveTree, getEnergyList, saveArchivesEquipmentRelation, updateArchive }
