const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, notesController.getAllNotes);
router.post('/', authMiddleware, notesController.createNote);
router.get('/:id', authMiddleware, notesController.getNoteById);
router.put('/:id', authMiddleware, notesController.updateNote);
router.delete('/:id', authMiddleware, notesController.deleteNote);

module.exports = router;
