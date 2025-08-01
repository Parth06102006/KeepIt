import { ContentType, PrismaClient } from "@/lib/generated/prisma";
import {auth} from '@clerk/nextjs/server'
import { NextResponse,NextRequest } from "next/server";

const prisma = new PrismaClient()

export async function GET(req : NextRequest)
{
    try
    {
        const user = await auth()
        if(!user) return NextResponse.json({error:'User is unauthenticated'},{status:401})
        const {projectId,type} = await req.json()
        if(!projectId || !type)
        {
            return NextResponse.json({error:'No Input Provided'},{status:400})
        }
        try {
            const linkRes = await prisma.link.findMany({where:{projectId:projectId,content:type as ContentType}})
            return NextResponse.json(linkRes)
        } catch (error) {
            if(error instanceof Error)
            {
                return NextResponse.json({error:error.message},{status:500})
            }
            return NextResponse.json({error:'Error Fetching the link'},{status:500})
        }
        } catch (error) {
            if(error instanceof Error)
            {
                return NextResponse.json({error:error.message},{status:500})
            }
            return NextResponse.json({error:'Error Fetching the link'},{status:500})
        }
}