const pool = require("../config/pool");

class Faculty {
  static findByUsername(username) {
    return pool.execute("SELECT * FROM users WHERE username = ?", [username]);
  }
}

module.exports = Faculty;
