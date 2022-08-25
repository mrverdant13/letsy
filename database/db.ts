import type { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

import config from '../config';

let isConnected: boolean;

export const connect = async (): Promise<MongoClient> => {
  const activeConnection: mongoose.Connection | undefined = mongoose.connections.find(
    // `readyState` has a value of `1` when the connection is open.
    (c) => (c.readyState === 1),
  );
  if (activeConnection) {
    console.log('Already connected to database');
    return activeConnection.getClient() as MongoClient;
  }
  const connectionString: string = config.db.connectionString;
  await mongoose.disconnect();
  const m: typeof mongoose = await mongoose.connect(connectionString);
  const client: MongoClient = m.connection.getClient() as MongoClient;
  isConnected = true;
  console.log('Connected to database:', connectionString);
  return client;
}

export const disconnect = async (): Promise<void> => {
  if (!isConnected) {
    console.log('Already disconnected from database');
    return;
  }
  await mongoose.disconnect();
  console.log('Disconnected from database');
}