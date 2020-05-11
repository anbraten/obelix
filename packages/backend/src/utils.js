const db = require('./db');

function memberOf(userId, group) {
  // check if user already exists
  const user = db.get('users').find({ id: userId }).value();
  return user.group && user.group === group;
}

module.exports = {
  memberOf,
};
