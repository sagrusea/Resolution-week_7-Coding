import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session');

    const publicPages = ['/login', '/register'];
    const isPublic = publicPages.includes(event.url.pathname);

    if (!session && !isPublic) {
        throw redirect(303, '/login');
    }

    if (session && isPublic) {
        throw redirect(303, '/');
    }

    return resolve(event);
}