import {SQLiteDatabase} from 'react-native-sqlite-storage';

type List = {
  name: string;
  items: string;
};

const addList = (db: SQLiteDatabase, values: List) => {
  return new Promise(resolve => {
    const maxQuery = 'SELECT MAX(id) FROM shopping';
    const addQuery = `INSERT INTO shopping (id, name, items) VALUES (?,?,?)`;
    let count: string | number; // concat type error with differing types
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
          const params = [count].concat(Object.values(values));
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

const removeList = () => {};

const addListItem = () => {};

const removeListItem = () => {};

const updateListItem = () => {};

export {addList, editListName};
