import prisma from "@/prisma/client";
// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// export async function GET(
//   req: Request
// ) {
//   try {
//     const {user} = auth()
//     if (user) {
//       return NextResponse.json(user);
//     }
//   } catch (err) {
//     console.log(err);
//     return NextResponse.error();
//   }
// }


export async function POST(
    req: Request
) {
    try {
        const { userId, dob, gender, lat, long, name } = await req.json()
        if (userId) {
            const oldUser = await prisma.user.findUnique({
                where: {
                    userId: userId
                }
            })
            if (oldUser) {
                if (!oldUser.name) {
                    const updatedUser = await prisma.user.update({
                        where: {
                            userId: userId
                        },
                        data: {
                            dob: dob,
                            gender: gender,
                            lat: lat,
                            long: long,
                            name: name
                        }
                    })
                    return NextResponse.json(updatedUser);
                } else {
                    return NextResponse.json(oldUser);
                }
            } else {
                if (!name) {
                    const user = await prisma.user.create({
                        data: {
                            userId: userId,
                        }
                    })
                    return NextResponse.json(user);
                } else {
                    const user = await prisma.user.create({
                        data: {
                            userId: userId,
                            dob: dob,
                            name: name,
                            lat: lat,
                            long: long,
                            gender: gender
                        }
                    })
                    return NextResponse.json(user);
                }
            }
        }
    } catch (err) {
        console.log(err);
        return NextResponse.error();
    }
}

