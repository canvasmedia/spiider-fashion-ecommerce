import { NextResponse } from 'next/server';
import { ALL_PRODUCTS } from '@/lib/constants';

export async function GET() {
  return NextResponse.json(ALL_PRODUCTS);
}
