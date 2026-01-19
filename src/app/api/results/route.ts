import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Result from "@/models/Result";

export async function GET() {
  try {
    // 1. Ensure the database is connected
    const conn = await connectDB();
    
    // DIAGNOSTIC LOGS
    const dbName = conn.connection.db?.databaseName;
    const collections = await conn.connection.db?.listCollections().toArray();
    const collectionNames = collections?.map(c => c.name);
    
    console.log("=> Connected to Database:", dbName);
    console.log("=> Available Collections:", collectionNames);

    // 2. Fetch all data from the 'results' collection
    const results = await Result.find({}).lean();

    // 3. Return the data along with diagnostics to help the user
    return NextResponse.json({
      status: "success",
      debug: {
        database: dbName,
        collections: collectionNames,
      },
      count: results.length,
      data: results,
    });
  } catch (error: any) {
    console.error("=> Error fetching results:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch results",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
