import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient()
export async function GET(){
    try {
        const user = await auth();
        if (!user)
            {
                return NextResponse.json({error:'User is Unauthorized'},{status:403})
            }
        if(!user.userId){
            return NextResponse.json({error:'User does not consist of a userId'},{status:404})
        }
        const totalProjects = await prisma.totalProjects.findFirst({
            where:{userId:user.userId},
            include:{projects:true},
        });
        if(!totalProjects)
        {
            return NextResponse.json({error:'No Collections are Created'},{status:400})
        }
        const list:string[] = [];
        (totalProjects.projects).map((e)=>{list.push(e.title)})
        return NextResponse.json({collectionsList:list})
    } catch (error) {
        if(error instanceof Error)
        {
            return NextResponse.json({error:error.message},{status:500})
        }
        return NextResponse.json({error:'Cannot Fetch Collections'},{status:500})
    }
    finally
    {
        prisma.$disconnect()
    }
}