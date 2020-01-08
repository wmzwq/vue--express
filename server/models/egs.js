var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var egSchema = new Schema({
    "name": String
});
//会在数据库里自动查找egs数据表
module.exports = mongoose.model('Eg', egSchema)