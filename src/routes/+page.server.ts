import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
    logout: async ({ cookies }) => {
        cookies.delete('session', { path: '/' });
        throw redirect(303, '/');
    }
}