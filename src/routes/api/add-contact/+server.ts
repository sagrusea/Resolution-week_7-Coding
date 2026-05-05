import { json } from "@sveltejs/kit";
import db from '$lib/server/db';

export async function POST({ request }) {
    const { name, address, phone } = await request.json();

    const statement = db.prepare(
        `INSERT INTO contacts (name, address, phone) VALUES (@name, @address, @phone)`
    );
    statement.run({ name, address, phone });

    return json({ success: true }, { status: 201 });
}