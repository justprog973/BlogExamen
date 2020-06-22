const connection = require('../config/database');


class Users {
    
    /**
     * get all users with  an limit of 12 and an order id ASC by default 
     * @param {limit of the request } limit 
     * @param {order by which we get the elements } orderBy 
     * @param {callback } cb 
     */
    static all(limit = 12, orderBy = 'id ASC', cb){
        connection.query('SELECT id username, email, password, first_name, last_name FROM users ORDER BY ? LIMIT ?',[orderBy,limit],(err,rows)=>{
                if(err) throw err;
                cb(rows);
        });
    }

    /**
     * find a user by id
     * @param {id of user } id 
     * @param {callback } cb 
     */
    static findBy(id, cb){
        connection.query('SELECT id username, email, password, first_name, last_name FROM users WHERE id = ? ',[id],(err,row)=>{
            if(err) throw err;
            cb(row);
        });
    }

    /**
     * create a user
     * @param {elements send by the form } elements 
     * @param {callback } cb 
     */
    static create(elements, cb){
        connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [elements['username'],elements['email'],elements['password']],(err, row)=>{
            if(err) throw err;
            cb(row);
        });
    }

    /**
     * check if the user exists 
     * @param {element on which we checked (username or email) } element
     * @param {callback } cb 
     * @param {element on which we should check user } name 
     */
    static checkUser(element, cb, name = 'username'){
        connection.query(`SELECT username, email FROM users WHERE ${(name === 'username') ? 'username = ?' : 'email = ?'}`, [element],(err, row)=>{
            if(err) throw err;
            cb(row);
        });
    }
}

module.exports = Users;