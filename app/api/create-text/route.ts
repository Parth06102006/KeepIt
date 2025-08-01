import {NextRequest,NextResponse} from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'
import {auth} from '@clerk/nextjs/server'

const prisma = new PrismaClient()

export async function POST(req:NextRequest){
    try {
            const user = auth()
            if(!user)
            {
                return NextResponse.json({error:'User is Unauthorized'},{status:500})
            }
            const form = await req.formData();
            if(!form)
            {
                return NextResponse.json({error:'No form found'},{status:400})
            }
            const projectId = form.get('projectId') as string
            const publicDispaly = form.get('publicDisplay') as unknown as boolean
            const userTextInput = form.get('textInput') as string
            if(!userTextInput)
            {
                return NextResponse.json({error:'Text not provided'},{status:404})
            }
        
            if(!projectId)
            {
                return NextResponse.json({error:'Fill in all the details'},{status:404})
            }
            const project = await prisma.project.findUnique({where:{id:projectId},include:{texts:true}})
            if(!project)
            {
                return NextResponse.json({error:'No Collection Found'},{status:404})
            }
                try {
                const textRes = await prisma.texts.create({data:{
                        content: userTextInput as string,
                        publicDisplay:publicDispaly,
                        projectId:project.id,
                    }}
                )
                return NextResponse.json(textRes)
                } catch (error) {
                    if (error instanceof Error)
                    {
                        return NextResponse.json({error:error.message},{status:500})
                    }
                    return NextResponse.json({error:'Unable to upload texts'},{status:500})
            }
    } catch (error) {
        if(error instanceof Error)
        {
            return NextResponse.json({error:error.message},{status:500})
        }
        return NextResponse.json({error:'Cannot create Texts'},{status:500})
    }
    finally
    {
        prisma.$disconnect()
    }
}
