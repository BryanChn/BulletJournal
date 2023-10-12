import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// TODO find solution for post note with a user log in (authorId)
export async function POST(req: Request) {
    const body = await req.json();
    const newNote = await prisma.note.create({
        data: {
            title: body.title,
            content: body.content,
            importanceIndex: body.importanceIndex,
            authorId: body.authorId,
        },
    });
    return NextResponse.json(newNote, {
        status: 201,
    });
}
