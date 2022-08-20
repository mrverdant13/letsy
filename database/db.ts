import mongoose from 'mongoose';

import config from '../config';

let isConnected: boolean;

export const connect = async () => {
  try {
    const activeConnection: mongoose.Connection | undefined = mongoose.connections.find(
      // `readyState` has a value of `1` when the connection is open.
      (c) => (c.readyState === 1),
    );
    if (activeConnection) {
      console.log('Already connected to database');
      return;
    }
    const connectionString = config.db.connectionString;
    await mongoose.disconnect();
    await mongoose.connect(connectionString);
    isConnected = true;
    console.log('Connected to database:', connectionString);
  } catch (e) {
    console.error('Error connecting to database:', e);
    isConnected = false;
  }
}

export const disconnect = async () => {
  if (!isConnected) {
    console.log('Already disconnected from database');
    return;
  }
  await mongoose.disconnect();
  console.log('Disconnected from database');
}