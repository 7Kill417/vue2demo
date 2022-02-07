import {request} from './http'
//import {post} from './http2'


//课程达成度
//列表
export const getAchievelevelList = (data) => request({url:`/achievelevel/list`,method:'GET',params:data})
//新增
export const achievelevelSave = (data) => request({url:`/achievelevel/save`,method:'POST',data:data})
//详情
export const achievelevelInfo = (data) => request({url:`/achievelevel/info`,method:'GET',params:data})
//删除
export const achievelevelDelete = (data) => request({url:`/achievelevel/delete`,method:'DELETE',data:data})
//修改
export const achievelevelUpdate = (data) => request({url:`/achievelevel/update`,method:'PUT',data:data})
//删除学生课程成绩
export const achievelevelDeleteResult = (data) => request({url:`/achievelevel/deleteResult`,method:'DELETE',data})
//修改学生课程分数 
export const achievelevelUpdateResult = (data) => request({url:`/achievelevel/updateResult`,method:'PUT',data:data})
//导入已封装另外的方法


//指标点评价
//删除
export const kpinfoDelete = (data) => request({url:`/kpinfo/delete`,method:'POST',data:data})
//详情
export const kpinfoInfo = (data) => request({url:`/kpinfo/info`,method:'GET',params:data})
//列表
export const kpinfoList = (data) => request({url:`/kpinfo/list`,method:'GET',params:data})
//毕业要求内容所有的增删改
export const kpinfoSave = (data) => request({url:`/kpinfo/save`,method:'POST',data:data})
//修改
export const kpinfoUpdate = (data) => request({url:`/kpinfo/update`,method:'PUT',data:data})
//根据毕业要求查询指标点
export const getKpiInfoByRequireId = (data) => request({url:`/kpinfo/getKpiInfoByRequireId/${data}`,method:'GET'})
//查询毕业要求以及指标点
export const kpiList = (data) => request({url:`/kpinfo/kpiList`,method:'GET',params:data})


//毕业要求达成度
//删除
export const graduationreqiureDelete = (data) => request({url:`/graduationreqiure/delete`,method:'DELETE',data:data})
//导入已疯转另外的方法
//详情
export const graduationreqiureInfo = (data) => request({url:`/graduationreqiure/info`,method:'GET',params:data})
//列表
export const graduationreqiureList = (data) => request({url:`/graduationreqiure/list`,method:'GET',params:data})
//保存
export const graduationreqiureSave = (data) => request({url:`/graduationreqiure/save`,method:'POST',data:data})
//修改
export const graduationreqiureUpdate = (data) => request({url:`/graduationreqiure/update`,method:'PUT',data:data})
//课程详情\
export const graduationreqiureCourseInfo = (data) => request({url:`/graduationreqiure/courseInfo`,method:'GET',params:data})

//指标点达成度详情  
export const studentLevelDetails = (data) => request({url:`/course/studentLevelDetails`,method:'GET',params:data})
//指标点达成度删除
export const courseDelete = (data) => request({url:`/course/delete`,method:'DELETE',data:data})
//修改指标点达成度信息
export const courseUpdate = (data) => request({url:`/course/update`,method:'PUT',data:data})







