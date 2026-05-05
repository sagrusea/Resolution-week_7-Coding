import { error, fail, redirect} from "@sveltejs/kit";
import type { Actions } from "./$types";
import db from "$lib/server/db";
import bcrypt from "bcrypt";

export const actions = {
    register: async ({ request }) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');

        const userExist = db.prepare(`SELECT id FROM users WHERE username = ?`).get(username);
        if (userExist) {
            return fail(400, { error: "user already exists" });
        }

        const passwordHashed = await bcrypt.hash(password, 12);
        const userID = crypto.randomUUID();

        try {
            db.prepare(`INSERT INTO users (id, username, password_hash) VALUES (?, ?, ?)`).run(userID, username, passwordHashed);
        } catch(error) {
            return fail(500, { error: "error when trying to save to db" });
        }

        throw redirect(303, '/login');
    }
} satisfies Actions;