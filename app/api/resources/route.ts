// api/resources/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/utils/prisma';

// GET all resources
export async function GET() {
  try {
    const resources = await prisma.downloadableResource.findMany({
      include: {
        image: true, // Include the related image data
      },
    });

    const resourcesWithBase64Images = resources.map(resource => {
      if (resource.image) {
        const base64Image = Buffer.from(resource.image.data).toString('base64');
        resource.image.id = `data:${resource.image.type};base64,${base64Image}`;
      }
      return resource;
    });

    return NextResponse.json(resourcesWithBase64Images);
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
  }
}

// POST a new resource
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const image = formData.get('image') as File;
    const link = formData.get('link') as string;

    if (!name || !description || !category || !link) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let uploadedImage;
    if (image) {
      const arrayBuffer = await image.arrayBuffer();
      uploadedImage = await prisma.uploadedFile.create({
        data: {
          name: image.name,
          type: image.type,
          data: Buffer.from(arrayBuffer),
        },
      });
    }

    const resource = await prisma.downloadableResource.create({
      data: {
        name,
        description,
        category,
        imageId: uploadedImage ? uploadedImage.id : null,
        link,
      },
    });

    return NextResponse.json(resource);
  } catch (error) {
    console.error('Error creating resource:', error);
    return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
  }
}

// DELETE a resource by ID
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    await prisma.downloadableResource.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Resource deleted' });
  } catch (error) {
    console.error('Error deleting resource:', error);
    return NextResponse.json({ error: 'Failed to delete resource' }, { status: 500 });
  }
}
