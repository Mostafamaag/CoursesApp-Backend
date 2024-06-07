const express = require('express');
const { body } = require('express-validator');
const userRoles = require('../utils/userRoles');

const verifyToken = require('../middleware/verifyToken');
const allowedTo = require('../middleware/allowedTo');

const router = express.Router();

const coursesController = require('../controllers/courses.controller')


//list all courses
router.route('/')
    .get(coursesController.getAllCourses)
    .post(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER),[
        body('title')
            .notEmpty()
            .withMessage("Title is required")
            .isLength({ min: 2 })
            .withMessage("title at least is 2 digits"),
        body('price')
            .notEmpty()
            .withMessage("Price is required")
    ], coursesController.addCourse)


router.route('/:courseId')
    .get(coursesController.getCourse)
    .patch(coursesController.updateCourse)
    .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), coursesController.deleteCourse)

module.exports = router;