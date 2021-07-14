const db = require('../connection');

const getUserInfo = (email) => {

  const queryStatement = `SELECT * FROM users WHERE email=$1 `;
  return db.query(queryStatement, [email])
    .then((response) => {
      return response.rows[0];
    })
    .catch(err => console.log(err));
};

module.exports = {
  getUserInfo
};