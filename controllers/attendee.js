const Attendee = require('../models/Attendee');

exports.getAllAttendees = (req, res, next) => {
  Attendee.fetchAll(attendees => {
    return res.json(
      attendees
    );
  });
};

exports.getAttendee = (req, res, next) => {
  const attendeeId = req.params.id;
  Attendee.fetchById(attendeeId, attendee => {
    return res.json(
      attendee
    );
  });
};

exports.addAttendee = (req, res, next) => {
  let body
  try {
    body = JSON.parse(req.body);
  } catch (e) {
    body = req.body
  }
  const firstName = body.firstName;
  const lastName = body.lastName;
  const email = body.email;
  const attendee = new Attendee(null, firstName, lastName, email);
  attendee.save(attendees => {
    return res.json(
      attendees
    )
  });



};