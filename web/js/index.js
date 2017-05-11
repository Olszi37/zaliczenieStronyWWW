/**
 * Created by Siny on 2017-04-30.
 */

$(document).ready( function () {
    $("#loginInfo").text(sessionStorage.getItem("user_create_success"))
})

function authenticate(){
    var db = getDatabase()

    var fieldLogin = $("#login").val()

    db.transaction(function (tx) {
        tx.executeSql("SELECT uzytkownik_id, login, haslo FROM uzytkownicy WHERE login LIKE ?", [fieldLogin],
            function(tx, sqlResultSet) {
                checkData(sqlResultSet)
            }, function(tx, error) {
                throwAlert(tx, error)
            })
    })
}

function checkData(sqlResultSet){

    console.log(sqlResultSet.rows.length)
    if(sqlResultSet.rows.length != 0){
        var row = sqlResultSet.rows.item(0)

        var loginFromDb = row.login;
        var login = $("#login").text()
        var passwordFromDb = row.haslo;
        var password = $("#password").val()

        if (login == loginFromDb) {
            if (password == passwordFromDb){
                sessionStorage.setItem("user_id", row.uzytkownik_id);
                window.location.href = "userPage.html";
                console.log("zalogowany")
            }
            else
                authAlert()
        }
        else
            authAlert()
    } else {
        console.log("db data fetch failure")
    }
}

function throwAlert(tx, error){
    console.log(error.message)
}

function authAlert() {
    $("#loginInfo").text('Login lub haslo niepoprawne')
}

function redirectRegister(){
    window.location.href = "register.html"
}

function searchSomeone(){
    var db = getDatabase()

    var searchLogin = $("#searchLogin").val()

    db.transaction( function (tx) {
        tx.executeSql("SELECT id FROM uzytkownicy WHERE login = ?", [searchLogin], function (tx, data) {

        }, function (tx, error) {
            console.log(error.message)
        })
    })
}
