const events = require("events");
const UserProfile = require("../models/baseModel")("userProfiles");

const eventEmitter = new events.EventEmitter();

eventEmitter.on("user_signup", (payload) => {
  UserProfile.create(payload);
});

module.exports = {
  eventEmitter,
};
