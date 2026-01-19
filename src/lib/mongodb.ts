import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: GlobalMongoose;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    if (mongoose.connection.db?.databaseName === "Education") {
      return mongoose;
    }
    console.warn("=> Wrong database detected (", mongoose.connection.db?.databaseName, "). Closing and reconnecting...");
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: "Education",
    };

    const maskedUri = MONGODB_URI?.replace(/:([^@]+)@/, ":****@");
    console.log("=> Connecting to MongoDB URI:", maskedUri);

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log("=> MongoDB Connected Successfully to:", mongoose.connection.db?.databaseName);
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("=> MongoDB Connection Error:", e);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
