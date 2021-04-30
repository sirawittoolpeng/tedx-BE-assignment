const path = require('path');
const express = require('express');

const speakerController = require('../controllers/speaker');
const router = express.Router();


router.get('/speakers', speakerController.getAllSpeakers);
router.get('/speaker/:id', speakerController.getSpeaker);
router.post('/speaker', speakerController.addSpeaker);



module.exports = router;