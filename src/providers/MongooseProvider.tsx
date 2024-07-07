import React from 'react'
import connect from "@/utils/db";

export const MongooseProvider = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    const connectDB = async () => {
      await connect();
    };
    connectDB();
  }, []);

  return (
    <>
      {children}
    </>
  )
}

export default MongooseProvider