import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// post user route
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

// get one user by name route
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    try {
        const users = await prisma.user.findMany({
            where: {
                name:
                    (name && { contains: name }) ||
                    (email && { contains: email }),
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

export async function PUT(req: Request) {
    const body = await req.json();
    const user = await prisma.user.update({
        where: {
            id: body.id,
        },
        data: {
            name: body.name,
            picture: body.picture,
            email: body.email,
            password: body.password,
        },
    });
    return NextResponse.json(user, {
        status: 201,
    });
}

export async function DELETE(req: Request) {
    const body = await req.json();
    const user = await prisma.user.delete({
        where: {
            id: body.id,
        },
    });
    return NextResponse.json(user, {
        status: 201,
    });
}
