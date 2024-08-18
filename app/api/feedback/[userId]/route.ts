import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/utils/prisma';

// Function to handle GET requests
export async function GET() {
  try {
    // Fetch all feedback
    const feedbacks = await prisma.feedback.findMany();

    // Compute averages
    const totalFeedbacks = feedbacks.length;
    const averages = {
      overallExperience: feedbacks.reduce((sum, f) => sum + f.overallExperience, 0) / totalFeedbacks,
      toolFunctionality: feedbacks.reduce((sum, f) => sum + f.toolFunctionality, 0) / totalFeedbacks,
      peerSupportQuality: feedbacks.reduce((sum, f) => sum + f.peerSupportQuality, 0) / totalFeedbacks,
    };

    return NextResponse.json({ feedbacks, averages });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch feedbacks' }, { status: 500 });
  }
}

// Function to handle POST requests
export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body of the request
    const { overallExperience, toolFunctionality, peerSupportQuality, email, userName, profileImage, userId, comments } = await req.json();

    // Validate that ratings are between 1 and 5
    if (
      overallExperience < 1 || overallExperience > 5 ||
      toolFunctionality < 1 || toolFunctionality > 5 ||
      peerSupportQuality < 1 || peerSupportQuality > 5
    ) {
      return NextResponse.json({ error: 'Ratings must be between 1 and 5' }, { status: 400 });
    }

    // Create a new feedback entry with the provided data
    const newFeedback = await prisma.feedback.create({
      data: {
        overallExperience,
        toolFunctionality,
        peerSupportQuality,
        email,
        userName,
        profileImage,
        userId,
        comments, // Add comments to the feedback
      },
    });

    // Return the created feedback with a 201 status
    return NextResponse.json(newFeedback, { status: 201 });
  } catch (error) {
    console.error('Error creating feedback:', error);
    // Return a 500 error if creating the feedback fails
    return NextResponse.json({ error: 'Failed to create feedback' }, { status: 500 });
  }
}