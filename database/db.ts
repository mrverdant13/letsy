import type { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

import config from '../config';

type GlobalType =
  & typeof globalThis
  & {
    mongoose: {
      connection?: typeof mongoose;
      promise?: Promise<typeof mongoose>;
    };
  }
  ;

let appGlobal: GlobalType = global as GlobalType;

let cached = appGlobal.mongoose;

if (!cached) {
  cached = appGlobal.mongoose = {
    connection: undefined,
    promise: undefined,
  }
}

export const connect = async (): Promise<MongoClient> => {
  if (cached.connection) return cached.connection.connection.getClient() as MongoClient;
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    const connectionString = config.db.connectionString;
    cached.promise = mongoose.connect(connectionString, opts);
  }
  cached.connection = await cached.promise;
  return cached.connection.connection.getClient() as MongoClient;
}
