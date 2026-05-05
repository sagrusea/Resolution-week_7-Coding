import { json } from "@sveltejs/kit";
import db from '$lib/server/db';

export async function GET() {
    try {
        const statement = db.prepare( `SELECT id, name, address, phone FROM contacts` );

        const contacts = statement.all();

        return json( contacts );
    } catch( error ) {
        console.error("Error loading data", error);
        return json({ error: "Failed to load" }, { status: 500 });
    }
}