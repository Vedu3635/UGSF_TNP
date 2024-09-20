const db = require('../config/db');

class Faculty {
  static findByUsername(username) {
    return db.execute('SELECT * FROM users WHERE username = ?', [username]);
  }
}

module.exports = Faculty;
