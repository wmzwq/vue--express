var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Egs = require('../models/egs');

mongoose.connect("mongodb://127.0.0.1:27017/mydemo");

router.get('/', function(req, res, next) {

    Egs.find({}, (err, doc) => {
        if (err) {
            res.json({
                status: 1,
                msg: err.msg
            })
        } else {
            res.json({
                status: 0,
                msg: "",
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
})
module.exports = router;