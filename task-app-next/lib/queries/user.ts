import {User} from "@/app/types/user"
import {pool} from "@/lib/db";

export async function createUser(user: User) {
    const result = await pool.query("INSERT INTO users (id, username, password_hash) VALUES (&1, &2, &3) RETURNING *",
        [user.id, user.username, user.password_hash]
    );

    return result.rows[0];
}

export async function deleteUser(userId:number) {
    const result = await pool.query("DELETE FROM users WHERE id = ?",
        [userId, userId]);
    return result.rows[0];
}

export async function retrieveUserByUsernamePassword(username:string, passwordHash:string){
    const result = await pool.query("SELECT * FROM users WHERE username=? AND password_hash=?",
        [username, passwordHash]);
    return result.rows[0];
}