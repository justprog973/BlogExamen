const connection = require('../config/database');


class Users {

    /**
     * get all users with  an limit of 12 and an order id ASC by default
     * @param {int } limit
     * @param {string } orderBy
     * @param {callback } cb
     */
    static all(limit = 12, orderBy = 'id ASC', cb) {
        connection.query('SELECT id username, email, password, first_name, last_name FROM users ORDER BY ? LIMIT ?', [orderBy, limit], (err, rows) => {
            if (err) throw err;
            cb(rows);
        });
    }

    /**
     * find a user by id
     * @param {int } id
     * @param {callback } cb
     */
    static findBy(id, cb) {
        connection.query('SELECT id, username, email, password, firstname, lastname FROM users WHERE id = ? ', [id], (err, row) => {
            if (err) throw err;
            cb(row);
        });
    }

    /**
     * create a user
     * @param {Object } user
     * @param {callback } cb
     */
    static create(user, cb) {
        connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [user.username, user.email, user.password], (err, row) => {
            if (err) throw err;
            cb(row);
        });
    }

    /**
     * check if the user exists
     * @param {string }   user
     * @param {callback } cb
     * @param {string }   name
     * @param {boolean }  or
     */
    static checkIfUnique(username, cb, name = 'username', or = false) {
        connection.query(`SELECT id, username, email, password, firstname, lastname FROM users WHERE ${(name === 'username') ? 'username = ?' : 'email = ?'} ${or ? ' OR email = ?' : ''}` , [username, or ? username : null], (err, row) => {
            if (err) throw err;
            cb(row);
        });
    }
}

module.exports = Users;