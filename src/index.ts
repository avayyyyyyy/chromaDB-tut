import { ChromaClient } from "chromadb";

const db = new ChromaClient({
  path: "http://localhost:8000",
});

const main = async () => {
  try {
    const collection = await db.createCollection({
      name: "Test-Collection",
    });
    console.log(collection);
  } catch (e) {
    console.log("DB Already Exists");
  }
};

const insertDummyData = async () => {
  const dataCollection = await db.getCollection({
    name: "Test-Collection",
  });

  const data = await dataCollection.add({
    ids: Date.now().toString(),
    documents: "Hello World!",
    embeddings: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
  });

  console.log(data);
};

insertDummyData();

// main();
