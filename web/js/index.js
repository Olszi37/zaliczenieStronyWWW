/**
 * Created by Siny on 2017-04-30.
 */

$(document).ready( function () {

})

function authenticate(){
    var db = getDatabase()

    var fieldLogin = $("#login").val()

    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM uzytkownicy WHERE login = ?", [fieldLogin],
            function(tx, data) {
                checkData(tx, data)
            }, function(tx, error) {
                throwAlert(tx, error)
            })
    })
}

function checkData(tx, data){

    console.log(data.rows.length)
    if(data.rows.length != 0){
        var row = data.rows.item(0)

        var loginFromDb = row['login']
        var login = $("#login").text()
        var passwordFromDb = row['haslo'];
        var password = $("#password").val()

        if (login == loginFromDb) {
            if (password == passwordFromDb){
                //window.location.href = "";
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
