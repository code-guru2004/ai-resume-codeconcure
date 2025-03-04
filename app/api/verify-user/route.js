import { db } from "@/utils/db";
import { UsersTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req){
    const {user} = await req.json();
    return NextResponse.json({res:"Hello"})
}