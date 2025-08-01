import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient()
export async function GET(req : NextRequest){
    try {
        const user = await auth();
        if (!user)
            {
                return NextResponse.json({error:'User is Unauthorized'},{status:403})
            }
        if(!user.userId){
            return NextResponse.json({error:'User does not consist of a userId'},{status:404})
        }
        const {title} = await req.json()
        if(!title)
        {
            return NextResponse.json({error:'Title Not Found'},{status:400})
        }
        const project = await prisma.project.findUnique({where:{id:user.userId,title:title}})
        if(!project)
        {
            return NextResponse.json({error:'Project Not Found'},{status:404})
        }
        return NextResponse.json(project);
    } catch (error) {
        if(error instanceof Error)
        {
            return NextResponse.json({error:error.message},{status:500})
        }
        return NextResponse.json({error:'Cannot Fetch Project'},{status:500})
    }
    finally
    {
        prisma.$disconnect()
    }
}