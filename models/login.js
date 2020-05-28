'use strict';


module.exports = (Sequelize, DataTypes) => {
   
    const Login = Sequelize.define('Login', {
        
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
 

        email: {
            type:  DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
 
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
 
     
        
    }, {});
  
    return Login;
 
}

