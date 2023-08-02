import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            picture: body.picture,
            email: body.email,
            password: body.password,
        },
    });
    return NextResponse.json(newUser, {
        status: 201,
    });
}
