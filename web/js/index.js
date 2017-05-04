/**
 * Created by Siny on 2017-04-30.
 */

function authenticate(){
    var db = window.openDatabase('fotoblogasek', '1.0', 'fotoblogasek', 10 * 1024 * 1024)

    var login = $("#login").val()
    var password = $("#password").val()

    db.transaction(function (tx) {
        tx.executeSql("SELECT login, haslo FROM uzytkownicy WHERE login = ?", [login], checkData(SQLTransaction, data))
    })
}

function checkData(SQLTransaction, data){
    var row = data.rows.item(0)

    var loginFromDb = row['login']
    var login = $("#login").text()
    var passwordFromDb = row['password'];
    var password = $("#password").val()

    if (login == loginFromDb) {
        if (password == passwordFromDb)
            window.location.href = "";
        else
            authAlert()
    }
    else
        authAlert()
}

function authAlert() {
    $("#loginInfo").text('Login lub haslo niepoprawne')
}

function redirectRegister(){
    window.location.href = "register.html"
}
