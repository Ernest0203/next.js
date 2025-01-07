import clientPromise from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const postsCollection = db.collection("posts");

    await postsCollection.deleteMany({});

    return NextResponse.json("All posts have been deleted.");
  } catch (error) {
    console.error("Error clearing posts:", error);
    return NextResponse.json({ error: "Failed to clear posts." }, { status: 500 });
  }
}
