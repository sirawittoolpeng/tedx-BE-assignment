const fs = require('fs');
const path = require('path');

const speakersJSONPath = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'speakers.json'
);

const getSpeakersFromFile = callBack => {
    fs.readFile(speakersJSONPath, (err, fileContent) => {
        if (err) {
            callBack([]);
        } else {
            callBack(JSON.parse(fileContent));
        }
    });

};

module.exports = class Speaker {
    constructor(id, firstName, lastName, topic) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.topic = topic;
    }

    save(callBack) {
        getSpeakersFromFile(speakers => {
            if (this.id) {
                const existingSpeakerIndex = attendees.findIndex(
                    speaker => speaker.id === this.id
                );
                const updatedSpeakers = [...speakers];
                updatedSpeakers[existingSpeakerIndex] = this;
                fs.writeFile(speakersJSONPath, JSON.stringify(updatedSpeakers), err => {
                    console.log(err);
                });
            } else {
                this.id = (parseInt(speakers.length) + 1).toString();
                speakers.push(this);
                fs.writeFile(speakersJSONPath, JSON.stringify(speakers), err => {
                    console.log(err);
                });
                console.log(speakers);
                callBack({
                    status: 200,
                    data: speakers
                })
            }
        })

    }

    static fetchAll(callBack) {
        getSpeakersFromFile(allSpeakers => {
            callBack({
                status: 200,
                data: allSpeakers
            })
        });

    }

    static fetchById(speakerId, callBack) {
        getSpeakersFromFile(speakerObj => {
            const speaker = speakerObj.find(p => p.id === speakerId.toString())
            if (speaker != undefined) {
                callBack({
                    status: 200,
                    data: speaker
                })
            } else {
                callBack({
                    status: 404,
                    ErrorMessage: "Could not found the specified Id."
                })
            }
        });
    }


};