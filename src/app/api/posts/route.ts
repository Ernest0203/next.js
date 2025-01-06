import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const posts = await db.collection('posts').find({}).toArray();
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
