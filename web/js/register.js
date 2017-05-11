/**
 * Created by Siny on 2017-04-30.
 */

$(document).ready( function () {

})

function saveUser(){
    var db = getDatabase();

    var login = $("#login").val();
    var password = $("#password").val();

    if(login && password){
        db.transaction(function (tx) {

            tx.executeSql("INSERT INTO uzytkownicy (login, haslo) VALUES (?, ?)", [login, password],
                function() {
                    userAdded()
                },
                function (tx, error) {
                    console.log(error.message)
                    if (error.message.search("UNIQUE") != 0)
                        alert("Nazwa użytkownika jest już zajęta!")
                })
        })
    }
}

function userAdded(){
    console.log("uzytkownik dodany")

    sessionStorage.setItem("user_create_success", "Rejestracja przebiegła pomyślnie. Możesz się zalogować!")

    window.location.href = "index.html"
}
