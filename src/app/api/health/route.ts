import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    mode: 'demo-no-backend',
    timestamp: new Date().toISOString(),
  });
}
