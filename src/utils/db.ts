import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("Mongo URI is not set.");
}

declare global {
  var mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } =
  global.mongoose as { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

const connect = async () => {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const opts: {
      bufferCommands: boolean;
    } = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log("Mongo Connection successfully established.");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error("Error connecting to Mongoose", error);
    throw new Error("Error connecting to Mongoose");
  }
  return cached.conn;
};

export default connect;