import { openDB } from 'idb';

const initdb = async () =>
  openDB('mute', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('mute')) {
        console.log('mute database already exists');
        return;
      }
      db.createObjectStore('mute', { keyPath: 'id', autoIncrement: true });
      console.log('mute database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const muteDb = await openDB('mute', 1);
  const tx = muteDb.transaction('mute', 'readwrite');
  const store = tx.objectStore('mute');
  const request = store.add(content);
  const result = await request;
  console.log('Content added to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const muteDb = await openDB('mute', 1);
  const tx = muteDb.transaction('mute', 'readonly');
  const store = tx.objectStore('mute');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
