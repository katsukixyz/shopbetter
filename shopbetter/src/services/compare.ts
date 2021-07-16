import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {Comparison} from '../types/compareTypes';

const getComparisonData = (db: SQLiteDatabase) => {
  return new Promise<Comparison[]>(resolve => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM comparison', [], (tx, result) => {
        resolve(result.rows.raw());
      });
    });
  });
};

// const updateTableCols = (db: SQLiteDatabase) => {
//   const oldColNames = [
//     'comparisonid',
//     'comparisonname',
//     'comparisonstore',
//     'comparisonprice',
//     'comparisonquantity',
//   ];

//   try {
//     db.transaction(
//       tx => {
//         for (const colName of oldColNames) {
//           tx.executeSql(
//             `ALTER TABLE comparison RENAME ${colName} TO ${
//               colName.split('comparison')[1]
//             };`,
//             [],
//           );
//         }
//       },
//       err => console.log(err),
//     );
//   } catch (e) {
//     console.log(e);
//   }
// };

const addComparison = (db: SQLiteDatabase, values: Comparison) => {
  return new Promise<any>(resolve => {
    const maxQuery = 'SELECT MAX(id) FROM comparison';
    const addQuery = `INSERT INTO comparison (id, name, store, price, quantity) VALUES (?,?,?,?,?)`;
    let count: number;
    db.transaction(
      tx => {
        tx.executeSql(maxQuery, [], (tx, result) => {
          const max = result.rows.raw()[0]['MAX(id)'];
          if (max) {
            count = max + 1;
          } else {
            count = 1;
          }
          const params = [
            count,
            values.name,
            values.store,
            values.price,
            values.quantity,
          ];
          tx.executeSql(
            addQuery,
            params,
            (tx, result) => {
              resolve();
            },
            error => console.log('err', error),
          );
        });
      },
      err => console.log('err', err),
    );
  });
};

const updateComparison = (db: SQLiteDatabase, values: Comparison) => {
  return new Promise<any>(resolve => {
    const query =
      'UPDATE comparison SET name = ?, price = ?, quantity = ? WHERE id = ?';
    db.transaction(
      tx => {
        tx.executeSql(
          query,
          [values.name, values.price, values.quantity, values.id],
          (tx, result) => {
            resolve();
          },
          err => console.log(err),
        );
      },
      err => console.log(err),
    );
  });
};

const removeComparison = (db: SQLiteDatabase, id: number) => {
  return new Promise(resolve => {
    const query = 'DELETE FROM comparison WHERE id = ?';
    db.transaction(tx => {
      tx.executeSql(
        query,
        [id],
        (tx, result) => {
          resolve();
        },
        err => console.log(err),
      );
    });
  });
};

export {getComparisonData, addComparison, updateComparison, removeComparison};
