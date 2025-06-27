import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient()

export async function POST(req:NextRequest){
    try {
        const user = await auth();
        if(!user)
        {
            return NextResponse.json({error:'User is Unauthorizeed'},{status:401})
        }
        const {title} = await req.json()
        if(!title)
        {
            return NextResponse.json({error:'No Collection Name Provided'},{status:400})
        }
        let totalProjects;
        if(!user.userId)
        {
            return NextResponse.json({error:'UserId of the Authenticated User not Found'},{status:404})
        }
        totalProjects = await prisma.totalProjects.findFirst({where:{userId:user?.userId}})
        if(!totalProjects)
        {
            totalProjects = await prisma.totalProjects.create({data:{
                userId:user.userId
            }})
        }
        await prisma.project.create({data:{
            title,
            userId:user.userId,
            totalProjectId:totalProjects.id
        }}).then((response)=>{
            return NextResponse.json(response)
        })
    } catch (error:unknown) {
        if (error instanceof Error){
            return NextResponse.json({error:error.message},{status:500})
        }
        return NextResponse.json({err:'Unable to Create New Collection'},{status:500})
    }
    finally
    {
        prisma.$disconnect()
    }
}