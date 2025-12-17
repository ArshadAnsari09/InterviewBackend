module.exports = (dao) => { 
   return {
    insertMany:(data,)=>dao.insertMany(data),
    updateMany:(query,update,options={})=>dao.updateMany(query,update,options),
    getMany:  (query, project = {}, paginate = {}) => dao.find(query, project, paginate),
    getManyWithSort:  (query, project = {}, paginate = {},sort = {}) => dao.find(query, project, paginate).sort(sort),
    updateOne:(query,update,option)=>  dao.updateOne(query, update,option),
    findOneAndUpdate:  (query, update , option) => dao.findOneAndUpdate(query, update, option),
    findByIdAndUpdate:  (query, update , option) => dao.findByIdAndUpdate(query, update, option),
    getOne:  (query, project = {}) => dao.findOne(query, project),
    deleteOne:  (query, project = {}) => dao.deleteOne(query,project)
   }
}