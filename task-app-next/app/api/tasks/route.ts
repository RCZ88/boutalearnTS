import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await pool.query("SELECT * FROM tasks");

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch tasks" },
            { status: 500 }
        );
    }
}