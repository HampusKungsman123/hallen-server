const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');
const authMiddleware = require('../middleware/authMiddleware');



//> POST /api/exercises
router.post('/', exerciseController.createExercise);

//> GET /api/exercises
router.get('/', exerciseController.getAllExercises);

//> DELETE /api/exercises/:id
router.delete('/:id', exerciseController.deleteExercise);


module.exports = router;