const connection = require('../config/database');


class Users {
    
    static all(limit = 12, orderBy = 'id ASC',cb){
        connection.query('SELECT id username, email, password, first_name, last_name FROM users ORDER BY ? LIMIT ?',[orderBy,limit],(err,rows)=>{
                if(err) throw err;
                cb(rows);
        });
    }

    static findBy(id,cb){
        connection.query('SLECT id username, email, password, first_name, last_name FROM users WHERE id = ? ',[id],(err,row)=>{
            if(err) throw err;
            cb(row);
        });
    }

    static create(elements,cb){
        connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [elements['username'],elements['email'],elements['password']],(err, row)=>{
            if(err) throw err;
            cb(row);
        });
    }
}

module.exports = Users;