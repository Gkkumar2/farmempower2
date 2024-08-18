import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/utils/prisma';

// Function to handle GET requests
export async function GET(req: NextRequest) {
  try {
    // Extract the practiceId from the URL
    const practiceId = req.nextUrl.pathname.split('/').pop();

    // If practiceId is not provided, return a 400 error
    if (!practiceId) {
      return NextResponse.json({ error: 'Practice ID not provided' }, { status: 400 });
    }

    // Fetch reviews for the given practiceId
    const reviews = await prisma.review.findMany({
      where: { practiceId },
      orderBy: { createdAt: 'desc' },
    });

    // Return the fetched reviews with a 200 status
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    // Return a 500 error if fetching reviews fails
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// Function to handle POST requests
export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body of the request
    const { stars, review, email, userName, profileImage, practiceId, userId } = await req.json();

    // Create a new review with the provided data
    const newReview = await prisma.review.create({
      data: {
        stars,
        review,
        email,
        userName,
        profileImage,
        practiceId,
        userId,
      },
    });

    // Return the created review with a 201 status
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    // Return a 500 error if creating the review fails
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
