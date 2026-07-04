import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    mode: 'demo-no-backend',
    timestamp: new Date().toISOString(),
  });
}
