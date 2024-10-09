import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "@/node_modules/next/server";



export const POST = async (request: any) => {
    const { name, email, password } = await request.json();

    await connect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return new NextResponse("Email zaten kullanılıyor", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        return new NextResponse("Kullanıcı kayıt edildi", { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, { status: 500, });
    }

};
