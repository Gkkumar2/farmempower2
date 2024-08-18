import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/utils/prisma';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const category = await prisma.category.create({
      data: {
        name: data.categoryName,
        description: data.categoryDescription,
      },
    });

    const practice = await prisma.practice.create({
      data: {
        name: data.practiceName,
        description: data.practiceDescription,
        image: data.practiceImage,
        categoryId: category.id,
        objectives: data.objectives.split(','),
        suitableAreas: data.suitableAreas.split(','),
        benefits: data.benefits.split(','),
        challenges: data.challenges.split(','),
        bestPractices: data.bestPractices.split(','),
        impactOnSustainability: data.impactOnSustainability,
      },
    });

    await Promise.all(
      data.steps.map((step: { order: number, description: string }) =>
        prisma.step.create({
          data: {
            order: step.order,
            description: step.description,
            practiceId: practice.id,
          },
        })
      )
    );

    await Promise.all(
      data.examples.map((example: { location: string, details: string }) =>
        prisma.example.create({
          data: {
            location: example.location,
            details: example.details,
            practiceId: practice.id,
          },
        })
      )
    );

    await Promise.all(
      data.additionalResources.map((resource: { type: string, title: string, author: string, website?: string }) =>
        prisma.resource.create({
          data: {
            type: resource.type,
            title: resource.title,
            author: resource.author,
            website: resource.website,
            practiceId: practice.id,
          },
        })
      )
    );

    return NextResponse.json({ message: 'Sustainability practice added successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add sustainability practice' }, { status: 500 });
  }
}
export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        practices: true, // Include related practices if needed
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
