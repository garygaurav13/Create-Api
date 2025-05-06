// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const client = await clientPromise;
  const db = client.db('mydatabase');
  const posts = await db.collection('posts').find({}).toArray();

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db('mydatabase');
  const result = await db.collection('posts').insertOne(body);

  return NextResponse.json({ message: 'Post added', insertedId: result.insertedId });
}
