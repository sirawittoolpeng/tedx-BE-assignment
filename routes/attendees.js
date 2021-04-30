const path = require('path');
const express = require('express');

const attendeeController = require('../controllers/attendee');
const router = express.Router();


router.get('/attendees', attendeeController.getAllAttendees);
router.get('/attendee/:id', attendeeController.getAttendee);
router.post('/attendee', attendeeController.addAttendee);



module.exports = router;