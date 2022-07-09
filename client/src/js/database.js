import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// PUT/updates text in the database
export const putDb = async (content) => {
  console.log("PUT to the database");

  const textDb = await openDB("text", 1);

  const tx = textDb.transaction("text", "readwrite");

  const store = tx.objectStore("text");

  const request = store.put({ text: content });

  const result = await request;
  console.log("Data saved to the database", result);
};

// GET all text from the database
export const getDb = async () => {
  console.log("GET from the database");

  const textDb = await openDB("text", 1);

  const tx = textDb.transaction("text", "readwrite");

  const store = tx.objectStore("text");

  const request = store.getAll();

  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
