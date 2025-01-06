import { MongoClient } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

console.log('lib/mongodb.ts is executed');

const mongoUri = process.env.MONGODB_URI || '';
console.log('MongoDB URI:', mongoUri);

const client = new MongoClient(mongoUri);

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;

