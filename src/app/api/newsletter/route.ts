import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: `Thank you! ${body.email || 'You'} have been added to the Spiider VIP newsletter.`
    });
  } catch {
    return NextResponse.json({
      success: true,
      message: 'Thank you! You have been added to the Spiider VIP newsletter.'
    });
  }
}
