import {NextRequest,NextResponse} from 'next/server'
import { ContentType, PrismaClient } from '@/lib/generated/prisma'
import {auth} from '@clerk/nextjs/server'
import {v2 as cloudinary} from 'cloudinary'

cloudinary.config(
    {
        cloud_name:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key:process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET
    }
);

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
            const contentType = form.get('contentType') as string;
            const link  = form.get('link') as string | File
            const projectId = form.get('projectId') as string
            const publicDispaly = form.get('publicDisplay') as unknown as boolean
            let userTextInput;
            if(contentType.toLowerCase() === 'texts')
            {
                userTextInput = form.get('input') 
                if(!userTextInput)
                {
                    return NextResponse.json({error:'Text not provided'},{status:404})
                }
            }
        
            if(!contentType||!link||!projectId)
            {
                return NextResponse.json({error:'Fill in all the details'},{status:404})
            }
            const isContentist = ['Youtube',"X",'Instagram','Texts','Reddit' ,'Photos', 'Videos','OtherLinks'].find(t=>contentType.toLowerCase() === t.toLowerCase());
            if(!isContentist)
            {
                return NextResponse.json({error:'Content not in the List'},{status:404})
            }
            const project = await prisma.project.findUnique({where:{id:projectId},include:{links:true}})
            if(!project)
            {
                return NextResponse.json({error:'No Collection Found'},{status:404})
            }
            if(contentType==='photos')
            {
                const file = link as string
                try {
                    const response = await cloudinary.uploader.upload(file,{resource_type:"image"})
                    if(!response)
                    {
                        return NextResponse.json({error:'Failed to upload picture'})
                    }
                    const imageUrl = response.secure_url;
                    const imageRes = await prisma.link.create({data:{
                            content:contentType,
                            link:imageUrl,
                            publicDisplay:publicDispaly,
                            projectId:project.id,
                        }}
                    )
                    return NextResponse.json(imageRes)
                } catch (error) {
                    if (error instanceof Error)
                    {
                        return NextResponse.json({error:error.message},{status:500})
                    }
                    return NextResponse.json({error:'Unable to upload photo'},{status:500})
                }
            }
            else if(contentType === 'videos')
            {
                const file = link as string
                try {
                    const response = await cloudinary.uploader.upload(file,{resource_type:"video"})
                    if(!response)
                    {
                        return NextResponse.json({error:'Failed to upload video'})
                    }
                    const videoUrl = response.secure_url;
                    const videoRes = await prisma.link.create({data:{
                            content:contentType,
                            link:videoUrl,
                            publicDisplay:publicDispaly,
                            projectId:project.id,
                        }}
                    )
                    return NextResponse.json(videoRes)
                } catch (error) {
                    if (error instanceof Error)
                    {
                        return NextResponse.json({error:error.message},{status:500})
                    }
                    return NextResponse.json({error:'Unable to upload video'},{status:500})
                }
            }
            else if(['youtube','reddit','x','instagram','otherlinks'].some(t=>t === contentType))
            {
                try{
                    const linkRes = await prisma.link.create({data:{
                        content: contentType as ContentType,
                        link:link as string,
                        publicDisplay:publicDispaly,
                        projectId:project.id,
                    }})
                    return NextResponse.json(linkRes)
                } catch (error) {
                    if (error instanceof Error)
                    {
                        return NextResponse.json({error:error.message},{status:500})
                    }
                    return NextResponse.json({error:'Unable to upload link URL'},{status:500})
                }
            }
    } catch (error) {
        if(error instanceof Error) return NextResponse.json({error:error.message},{status:500})
        return NextResponse.json({error:'Unable to create link'},{status:500})
    }
    finally{
        prisma.$disconnect()
    }

}
