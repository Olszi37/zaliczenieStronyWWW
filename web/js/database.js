/**
 * Created by MOlszi on 2017-05-09.
 */

$(document).ready( function () {
    var db = getDatabase();

    createTables(db)
    debugDataBase(db)
})

function getDatabase() {
    return window.openDatabase('fotoblogasek', '1.0', 'fotoblogasek', 10 * 1024 * 1024);
}

function createTables(db){
    db.transaction(function (tx) {
        var uzytkownikCreateStatement = "CREATE TABLE IF NOT EXISTS uzytkownicy (uzytkownik_id INTEGER PRIMARY KEY, login TEXT unique, haslo TEXT)"
        tx.executeSql(uzytkownikCreateStatement, [],
            function () {
                console.log("Tabela uzytkownicy zostala utworzona")
            },
            function (tx, error) {
                console.log(error.message)
            })
    });

    db.transaction(function (tx) {
        var komentarzeCreateStatement = "CREATE TABLE IF NOT EXISTS komentarze (komentarz_id INTEGER PRIMARY KEY, uzytkownik_id INTEGER, komentarz TEXT, FOREIGN KEY (uzytkownik_id) REFERENCES uzytkownicy (uzytkownik_id))"
        tx.executeSql(komentarzeCreateStatement, [],
            function () {
                console.log("Tabela komentarze zostala utworzona")
            },
            function (tx, error) {
                console.log(error.message)
            })
    });

    db.transaction(function (tx) {
        var zdjeciaCreateStatement = "CREATE TABLE IF NOT EXISTS zdjecia (zdjecie_id INTEGER PRIMARY KEY, uzytkownik_id INTEGER, komentarz_id INTEGER, zdjecie BLOB, opis TEXT, tytul TEXT, FOREIGN KEY (uzytkownik_id) REFERENCES uzytkownicy (uzytkownik_id), FOREIGN KEY (komentarz_id) REFERENCES komentarze(komentarz_id))"
        tx.executeSql(zdjeciaCreateStatement, [],
            function () {
                console.log("Tabela zdjecia zostala utworzona")
            },
            function (tx, error) {
                console.log(error.message)
            })
    });
}

function debugDataBase(db){
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM uzytkownicy", [],
            function (tx, data) {
                console.log("uzytkownicy")
                displayDebugData(data)
            }, function (tx, error) {
                console.log(error.message)
            })
    });

    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM komentarze", [],
            function (tx, data) {
                console.log("komentarze")
                displayDebugData(data)
            }, function (tx, error) {
                console.log(error.message)
            })
    });

    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM zdjecia", [],
            function (tx, data) {
                console.log("zdjecia")
                displayDebugData(data)
            }, function (tx, error) {
                console.log(error.message)
            })
    });
}

function displayDebugData(data){
    var length = data.rows.length, i;
    for (i = 0; i < length; i++)
        console.log(data.rows.item(i))
}