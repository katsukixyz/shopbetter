import {SQLiteDatabase} from 'react-native-sqlite-storage';

const createTable = (
  db: SQLiteDatabase,
  tableName: 'shopping' | 'comparison',
) => {
  //! AUTOINCREMENT? if flutter checks last record and +1 then yes
  let query: string;
  switch (tableName) {
    case 'shopping':
      query = `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY, name TEXT, items TEXT)`;
    case 'comparison':
      query = `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY, name TEXT, store TEXT, price DOUBLE, quantity DOUBLE)`;
  }
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(query);
      resolve();
    });
  });
};

const getTableData = (db: SQLiteDatabase, tableName: string) => {
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM ${tableName}`, [], (tx, result) => {
        resolve(result.rows.raw());
      });
    });
  });
};

export {createTable, getTableData};
