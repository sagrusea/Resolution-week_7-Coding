import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import db from "$lib/server/db";
import bcrypt from "bcrypt";

export const actions = {
    login: async ({ request, cookies}) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');

        const user = db.prepare(`SELECT * FROM users WHERE username = ?`).get(username);

        if (!user) {
            return fail(400, { error: "User does not exist" });
        }

        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            return fail(400, { error: "Invalid password" });
        }

        cookies.set('session', user.id, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 *24 * 7
        });

        throw redirect(303, '/');
    }
} satisfies Actions;