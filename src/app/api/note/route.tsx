import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// user create a note route author is user relation to note
export async function POST(req: Request) {
    const body = await req.json();
    const newNote = await prisma.note.create({
        data: {
            title: body.title,
            content: body.content,
            importanceIndex: 1,
            authorId: body.authorId,
        },
    });
    return NextResponse.json(newNote, {
        status: 201,
    });
}
