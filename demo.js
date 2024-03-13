import { MongoClient } from "mongodb";

async function main() {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach((db) => console.log(`- ${db.name}`));
  } catch (error) {
    console.error("Error listing databases:", error);
  } finally {
    await client.close();
  }
}

async function createListing(client, newListing) {
    await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);#

    console.log(`New listing created with the following id:, ${result.insertedId}`);
}

main();
