import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {ListPage} from '../types/listTypes';

const addList = (db: SQLiteDatabase, values: ListPage) => {
  return new Promise(resolve => {
    const maxQuery = 'SELECT MAX(id) FROM shopping';
    const addQuery = `INSERT INTO shopping (id, name, items) VALUES (?,?,?)`;
    let count: number;
    db.transaction(tx => {
      tx.executeSql(
        maxQuery,
        [],
        (tx, result) => {
          const max = result.rows.raw()[0]['MAX(id)'];
          if (max) {
            count = max + 1;
          } else {
            count = 1;
          }
          const params = [count, values.name, values.items];
          tx.executeSql(
            addQuery,
            params,
            (tx, result) => {
              resolve();
            },
            error => {
              console.log('error', error);
            },
          );
        },
        err => console.log(err),
      );
    });
  });
};

const editListName = (db: SQLiteDatabase, id: number, name: string) => {
  return new Promise(resolve => {
    const query = 'UPDATE shopping SET name = ? WHERE id = ?';
    db.transaction(tx => {
      tx.executeSql(
        query,
        [name, id],
        (tx, result) => {
          resolve();
        },
        err => console.log(err),
      );
    });
  });
};

const updateListItem = (db: SQLiteDatabase, id: number, items: string) => {
  return new Promise(resolve => {
    const query = 'UPDATE shopping SET items = ? WHERE id = ?';
    db.transaction(tx => {
      tx.executeSql(
        query,
        [items, id],
        (tx, result) => {
          resolve();
        },
        err => console.log(err),
      );
    });
  });
};

const removeListItem = () => {};

export {addList, editListName, updateListItem};
