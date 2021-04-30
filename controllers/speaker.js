const Speaker = require('../models/Speaker');

exports.getAllSpeakers = (req, res, next) => {
    Speaker.fetchAll(speakers => {
    return res.json(
      speakers
    );
  });
};

exports.getSpeaker = (req, res, next) => {
  const speakerId = req.params.id;
  Speaker.fetchById(speakerId, speaker => {
    return res.json(
        speaker
    );
  });
};

exports.addSpeaker = (req, res, next) => {
  let body
  try {
    body = JSON.parse(req.body);
  } catch (e) {
    body = req.body
  }
  const firstName = body.firstName;
  const lastName = body.lastName;
  const topic = body.topic;
  const speaker = new Speaker(null, firstName, lastName, topic);
  speaker.save(speaker => {
    return res.json(
        speaker
    )
  });



};