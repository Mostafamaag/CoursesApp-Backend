const express = require('express');
const { body } = require('express-validator');

const multer  = require('multer');

const diskStorage = multer.diskStorage({
        destination : function (req, file, cb){
            console.log("FILE", file);
            cb(null, 'uploads');
        },
        filename: function (req, file, cb){
            const ext = file.mimetype.split('/')[1];
            const fileName = `user-${Date.now()}.${ext}`;
            cb(null, fileName)
        }
})

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];
    if(imageType === 'image'){
        return cb(null, true);
    }
    else { 
        return cb(appError.create('the file must be an image', 400), false);
    }
     
}
const upload = multer({ 
    storage: diskStorage ,
    fileFilter : fileFilter
});

const router = express.Router();
const usersController = require('../controllers/users.controller');
const verifyToken = require('../middleware/verifyToken');
const appError = require('../utils/appError');

//list all courses
router.route('/').get(verifyToken,usersController.getAllUsers);
router.route('/register').post(upload.single('avatar'), usersController.register);
router.route('/login').post(usersController.login);


module.exports = router;