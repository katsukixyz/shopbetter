import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {ListPage} from '../types/listTypes';
import {Comparison} from '../types/compareTypes';

//! cannot autoincrement since existing devices already have db with no autoincrement, and as such, not all devices will have an autoincrementing database

//* SHOULD ONLY BE USED IN DEV
const deleteTable = (
  db: SQLiteDatabase,
  tableName: 'shopping' | 'comparison',
) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`;
  // const query = `PRAGMA table_info(${tableName});`;
  db.transaction(tx => {
    tx.executeSql(query, [], (tx, result) =>
      console.log(tableName, result.rows.raw()),
    );
  });
};

const createTable = (
  db: SQLiteDatabase,
  tableName: 'shopping' | 'comparison',
) => {
  let query: string;
  switch (tableName) {
    case 'shopping':
      query = `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY, name TEXT, items TEXT)`;
      break;
    case 'comparison':
      query = `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY, name TEXT, store TEXT, price DOUBLE, quantity DOUBLE)`;
      // query = `CREATE TABLE IF NOT EXISTS ${tableName} (comparisonid INTEGER PRIMARY KEY, comparisonname TEXT, comparisonstore TEXT, comparisonprice DOUBLE, comparisonquantity DOUBLE)`;
      break;
  }
  db.transaction(tx => {
    tx.executeSql(query, []);
  });
};

export {deleteTable, createTable};
