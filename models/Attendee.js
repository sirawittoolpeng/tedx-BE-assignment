const fs = require('fs');
const path = require('path');

const attendeeJSONPath = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'attendees.json'
);

const getAttendeesFromFile = callBack => {
    fs.readFile(attendeeJSONPath, (err, fileContent) => {
        if (err) {
            callBack([]);
        } else {
            callBack(JSON.parse(fileContent));
        }
    });

};

module.exports = class Attendee {
    constructor(id, firstName, lastName, email) {
        // let new_id = parseInt(attendees.attendees.length) + 1;
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    save(callBack) {
        getAttendeesFromFile(attendees => {
            if (this.id) {
                const existingAttendeeIndex = attendees.findIndex(
                    attendee => attendee.id === this.id
                );
                const updatedAttendees = [...attendees];
                updatedAttendees[existingAttendeeIndex] = this;
                fs.writeFile(attendeeJSONPath, JSON.stringify(updatedAttendees), err => {
                    console.log(err);
                });
            } else {
                this.id = (parseInt(attendees.length) + 1).toString();
                attendees.push(this);
                fs.writeFile(attendeeJSONPath, JSON.stringify(attendees), err => {
                    console.log(err);
                });
                console.log(attendees);
                callBack({
                    status: 200,
                    data: attendees
                })
            }
        })

    }

    static fetchAll(callBack) {
        getAttendeesFromFile(allAttendees => {
            callBack({
                status: 200,
                data: allAttendees
            })
        });

    }

    static fetchById(attendeeId, callBack) {
        getAttendeesFromFile(attendeeObj => {
            const attendee = attendeeObj.find(p => p.id === attendeeId.toString())
            if (attendee != undefined) {
                callBack({
                    status: 200,
                    data: attendee
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