document.getElementById("btn_close_about").addEventListener("click", function (e) {
    $("#content").show();
    $("#about").hide();
});

document.getElementById("btn_close_list").addEventListener("click", function (e) {
    $("#list").hide();
    $("#main").css("margin-left", "50px");
});

document.getElementById("btn_list").addEventListener("click", function (e) {
    if( $("#list").is(":visible") ){
        $("#list").hide();
        $("#main").css("margin-left", "50px");
    }else{
        $("#list").show();
        $("#main").css("margin-left", "350px");
    }
});