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

export async function GET(
    req: Request,
    { params }: { params: { name: string } }
) {
    console.log("Requête:", req.url);
    console.log("Params:", params);

    try {
        const users = await prisma.user.findMany({
            where: {
                name: params.name,
            },
        });

        if (!users || users.length === 0) {
            return NextResponse.json({ message: "User not found" });
        }

        return NextResponse.json({ users });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
