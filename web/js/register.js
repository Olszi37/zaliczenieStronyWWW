/**
 * Created by Siny on 2017-04-30.
 */

function saveUser(){
    var db = window.openDatabase('fotoblogasek', '1.0', 'fotoblogasek', 10 * 1024 * 1024)

    createTables(db)

    db.transaction(function (tx) {
        var login = $("#login").text()
        var password = $("#password").text()

        tx.executeSql("INSERT INTO uzytkownicy VALUES (?, ?)", [login, password], userAdded(),
        function (tx, error) {
            alert(error.message)
        })
    })
}

function userAdded(){
    sessionStorage.setItem("user_create_succes", "Rejestracja przebiegła pomyślnie. Możesz się zalogować!")

    window.location.href="login.html"
}

function createTables(db){
    db.transaction(function (tx) {
        var uzytkownikCreateStatement = "CRATE TABLE uzytkownicy (uzytkownik_id INTEGER PRIMARY KEY, login TEXT, haslo TEXT)"
        tx.executeSql(uzytkownikCreateStatement, [],
        function () {
            alert("Tabela uzytkownicy zostala utworzona")
        },
        function (tx, error) {
            alert(error.message)
        })

        var komentarzeCreateStatement = "CREATE TABLE komentarze (komentarz_id INTEGER PRIMARY KEY, uzytkownik_id INTEGER, komentarz TEXT, FOREIGN KEY (uzytkownik_id) REFERENCES uzytkownicy (uzytkownik_id))"
        tx.executeSql(komentarzeCreateStatement, [],
        function () {
            alert("Tabela komentarze zostala utworzona")
        },
        function (tx, error) {
            alert(error.message)
        })

        var zdjeciaCreateStatement = "CREATE TABLE zdjecia (zdjecie_id INTEGER PRIMARY KEY, uzytkownik_id INTEGER, komentarz_id INTEGER, zdjecie BLOB, opis TEXT, FOREIGN KEY (uzytkownik_id) REFERENCES uzytkownicy (uzytkownik_id), FOREIGN KEY (komentarz_id) REFERENCES komentarze(komentarz_id))"
        tx.executeSql(zdjeciaCreateStatement, [],
            function () {
                alert("Tabela zdjecia zostala utworzona")
            },
            function (tx, error) {
                alert(error.message)
            })
    })
}
