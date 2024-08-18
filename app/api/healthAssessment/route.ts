import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { images, latitude, longitude, modifiers, disease_details, language, custom_id, datetime, identification_timeout, prune_diseases } = await req.json();

  try {
    const response = await axios.post('https://api.plant.id/v2/health_assessment', {
      images,
      latitude,
      longitude,
      modifiers,
      disease_details,
      language,
      custom_id,
      datetime,
      identification_timeout,
      prune_diseases,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': process.env.NEXT_PUBLIC_PLANT_ID_API_KEY,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error processing the health assessment' }, { status: 500 });
  }
}
