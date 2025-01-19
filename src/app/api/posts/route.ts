import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from "mongodb";

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, image } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("posts").insertOne({ title, content, image });
    const newPost = await db.collection("posts").findOne({ _id: result.insertedId });
    return NextResponse.json(
      { message: "Post created", post: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const { title, content, image } = req.body;

    if (!title || !content || !id) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('posts').updateOne(
      { _id: new ObjectId(id as string) },
      { $set: { title, content, image } }
    );
    res.status(201).json({ message: 'Post created', post: result });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Post ID is required' });
    }
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('posts').deleteOne({ _id: new ObjectId(id as string) })
    res.status(201).json({ message: 'Post created', post: result });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}