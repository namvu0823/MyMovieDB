import {pool} from '../config/db.js';

export const likeMovie =async(userId,movieId)=>{
    await pool.query(
        `INSERT INTO  liked_movies (user_id, movie_id) VALUES(:userId,:movieId)`,{userId,movieId}
    );
};

export const getLikedMovies= async(userId)=>{
    const [rows]=await pool.query(
        `SELECT movie_id FROM liked_movies WHERE user_id=:userId`,{userId}
    );
    return rows;
};
