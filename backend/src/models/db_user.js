import {pool} from '../config/db.js'

export const createUser= async(email,password_hash)=>{
    const[result]=await pool.query(
        `INSERT INTO  users (email,password_hash) VALUE (:email, :password_hash)`,
        {email,password_hash}
    );

    return result.insertId;
};

export const getUserByEmail= async(email)=>{
    const[rows]=await pool.query(
        `SELECT * FROM users WHERE email = :email`,{email}
    );
    return rows;
};

export const putUpdateUser=async(id,data)=>{
    const {email, display_name, avatar_url, theme}=data;
    const [result]=await pool.query(
        `UPDATE users
         SET email= :email, display_name= :display_name, avatar_url= :avatar_url, theme= :theme
         WHERE id=:id`,
        {id, email, display_name, avatar_url, theme}
    );

    return result;
};