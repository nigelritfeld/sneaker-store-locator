import * as SQLite from 'expo-sqlite';

export async function getCount(table) {
    return new Promise((resolve, reject) => {
        try {
            db.transaction(function (txn) {
                txn.executeSql(
                    "SELECT * FROM ?",
                    [table],
                    (transaction, resultSet) => {
                        resolve(resultSet.rows._array.length)
                    }
                );
            })
        } catch (e) {
            reject(e.message)
        }

    })
}

const db = SQLite.openDatabase('db.test', "1.0",'development',200000,(database)=>{

    try {
        database.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='stores'",
                [],
                function (tx, res) {
                    if (res.rows.length === 0) {
                        txn.executeSql('DROP TABLE IF EXISTS stores', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS stores (id INTEGER PRIMARY KEY AUTOINCREMENT, place_id VARCHAR(30) NOT NULL UNIQUE, name VARCHAR(30) NOT NULL, favorite BOOL NOT NULL DEFAULT FALSE, geometry VARCHAR(350) NOT NULL, business_status VARCHAR(15) NOT NULL, address VARCHAR(300) NOT NULL)',
                            []
                        );
                    }
                },
                function (transaction, error) {
                    console.error(error)
                }
            );
        })
        console.log('SQLite Table "Stores" Successfully Created...')
    } catch (e) {
        console.log(e.message)
    }
})

export function createTables() {
    createStoresTable()
        .then(createSettingsTable)
}


const create = (table, where, input) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                `INSERT INTO ${table} ()
                 VALUES ()${where} = ?;`,
                [input ? 1 : 0],
                (_, {rows: {_array}}) => setItems(_array)
            );
        },
        (error) => {
            alert(error.message)
        },
        () => {
            alert('Succes')
        }
    );
}
const update = () => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                `select *
                 from items
                 where done = ?;`,
                [1 ? 1 : 0],
                (_, {rows: {_array}}) => setItems(_array)
            );
        },
        (error) => {
            alert(error.message)
        },
        () => {
            alert('Succes')
        }
    );
}
const read = () => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                `select *
                 from items
                 where done = ?;`,
                [1 ? 1 : 0],
                (_, {rows: {_array}}) => setItems(_array)
            );
        },
        (error) => {
            alert(error.message)
        },
        () => {
            alert('Succes')
        }
    );
}
const remove = () => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                `select *
                 from items
                 where done = ?;`,
                [1 ? 1 : 0],
                (_, {rows: {_array}}) => setItems(_array)
            );
        },
        (error) => {
            alert(error.message)
        },
        () => {
            alert('Succes')
        }
    );
}

const createStoresTable = () => {
    return new Promise((resolve, reject) => {
        try {
            console.log('--------------TRANSACYIE--------------')
            db.transaction(function (txn) {
                txn.executeSql(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='stores'",
                    [],
                    function (tx, res) {
                        console.log('--------------------------- IN TRANSACTION --------------------------- ')
                        if (res.rows.length == 0) {
                            txn.executeSql('DROP TABLE IF EXISTS stores', []);
                            txn.executeSql(
                                'CREATE TABLE IF NOT EXISTS stores (id INTEGER PRIMARY KEY AUTOINCREMENT, place_id VARCHAR(30) NOT NULL UNIQUE, name VARCHAR(30) NOT NULL, favorite BOOL NOT NULL DEFAULT FALSE, geometry VARCHAR(350) NOT NULL, business_status VARCHAR(15) NOT NULL, address VARCHAR(300) NOT NULL)',
                                []
                            );
                            resolve(true)
                        }
                    },
                    function (transaction, error) {
                        console.error(error)
                        console.log(transaction)

                    }
                );
            })
            console.log('--------------END TRANSACTION--------------')

            console.log('SQLite Table "Stores" Successfully Created...')
            // alert('SQLite Database and Table Successfully Created...');
        } catch (e) {
            reject(e.message)
        }

    })
};
const createSettingsTable = () => {
    return new Promise((resolve, reject) => {
        try {
            db.transaction(function (txn) {
                txn.executeSql(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='settings'",
                    [],
                    function (tx, res) {
                        // console.log('item:', res.rows.length);
                        if (res.rows.length == 0) {
                            txn.executeSql('DROP TABLE IF EXISTS settings', []);
                            txn.executeSql(
                                "CREATE TABLE `settings` (`id` INT(20) unsigned AUTO_INCREMENT,`dark_modes` BOOLEAN(20) DEFAULT '0',`layout` INT(20), PRIMARY KEY (`id`))",
                                []
                            );
                            resolve(true)
                        }
                    }
                );
            })
            console.log('SQLite Database and Table Successfully Created...')
            // alert('SQLite Database and Table Successfully Created...');
        } catch (e) {
            reject(e.message)
        }

    })
};
const addStore = (place_id, name, favorite, geometry, business_status, vicinity) => {
    return new Promise((resolve, reject) => {
        try {
            db.transaction(function (txn) {
                const coords = JSON.stringify(geometry)
                txn.executeSql(
                    "INSERT INTO stores (place_id , name , favorite , geometry , business_status, address) VALUES (?,?,?,?,?,?);",
                    [place_id, name, favorite, coords, business_status, vicinity],
                    function (tx, res) {
                        resolve(res)
                        // todo: callback function
                    },
                    function (tx, error) {
                        console.log(error)
                    }
                );
            })
            // alert('SQLite Database and Table Successfully Created...');
        } catch (e) {
            reject(e.message)
        }

    })
};
const updateFavoriteStore = (place_id, isFavorite) => {
    return new Promise((resolve, reject) => {
        console.log('Starting try and catch')
        try {
            db.transaction(function (txn) {
                txn.executeSql(
                    // DELETE FROM `stores` WHERE `place_id`=?
                    "SELECT  * FROM stores WHERE place_id = ?",
                    [place_id],
                    function (tx, res) {
                        if (place_id === res.rows._array[0].place_id) {
                            const record = res.rows._array[0]
                            console.log(`REcord id =${record.id}`)
                            txn.executeSql(
                                // DELETE FROM `stores` WHERE `place_id`=?
                                "UPDATE stores SET favorite= ? WHERE id = ?;",
                                [isFavorite,record.id],
                                function (tx, res) {
                                    if (!(res.rowsAffected > 0)) {
                                        resolve(`Niks is aangepast voor ${record.name}`)
                                    }else{
                                        console.log(res.rows)
                                        console.log(`Updated record ${place_id}`)
                                        // console.log(place_id === res.rows._array[0].place_id)
                                        resolve(res)
                                        // todo: callback function
                                    }

                                },
                                function (tx, error) {
                                    console.log(error)
                                }
                            );

                        }
                        // resolve(res)
                        // todo: callback function
                    },
                    function (tx, error) {
                        console.log(error)
                    }
                );
            })
            // alert('SQLite Database and Table Successfully Created...');
        } catch (e) {
            reject(e.message)
        }

    })
};
const getStore = (place_id) =>{
    return new Promise((resolve, reject) => {
        try {
            db.transaction(function (txn) {
                txn.executeSql(
                    // DELETE FROM `stores` WHERE `place_id`=?
                    "SELECT  * FROM stores WHERE place_id = ?",
                    [place_id],
                    function (tx, res) {
                        resolve(res.rows._array[0])
                        // todo: callback function
                    },
                    function (tx, error) {
                        console.log(error)
                    }
                );

            })
            // alert('SQLite Database and Table Successfully Created...');
        } catch (e) {
            reject(e.message)
        }

    })

}
const removeStore = (id) => {
    return new Promise((resolve, reject) => {
        try {
            db.transaction(function (txn) {
                txn.executeSql(
                    "UPDATE stores SET 'favorite' = 0 WHERE 'place_id' = ?;",
                    [id],
                    function (tx, res) {
                        resolve(res)
                        // todo: callback function
                    },
                    function (tx, error) {
                        console.log(error)

                    }
                );
            })
            alert('SQLite Database and Table Successfully Created...');
        } catch (e) {
            reject(e.message)
        }

    })
};
const getRecords = (table = `stores`) => {
    return new Promise((resolve, reject) => {
        try {
            console.log('Stating')
            db.transaction(function (txn) {

                txn.executeSql(
                    `SELECT * FROM ${table}`,
                    [table],
                    (transaction, resultSet) => {
                        resolve(resultSet.rows._array)
                    },
                    (transaction, error) => {
                        throw error
                    }
                );
            })
            console.log('Ending')

        } catch (e) {
            reject(e.message)
        }
    })
}
const deleteStoresTables = () => {
    return new Promise((resolve, reject) => {
        try {
            db.transaction(function (txn) {
                txn.executeSql(
                    "DROP TABLE stores",
                );
            })
        } catch (e) {
            reject(e.message)
        }

    })

}



export {
    create,
    getRecords,
    update,
    read,
    remove,
    createStoresTable,
    deleteStoresTables,
    addStore,
    removeStore,
    updateFavoriteStore,
    getStore
}
