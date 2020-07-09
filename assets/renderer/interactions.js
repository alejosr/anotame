document.addEventListener("keydown", function(k){
    console.log(k)
    if(k.keyCode == 27){
        if($("#search").is(":visible")){
            $("#search").hide();
        }else{
            if($("#about").is(":visible")){
                $("#about").hide();
                $("#content").show();
            }else{
                ipcRenderer.send('dom-hide-window');
            }
        }
    }
});

document.getElementById("btn_about_close").addEventListener("click", function (e) {
    $("#content").show();
    $("#about").hide();
});

document.getElementById("btn_list_close").addEventListener("click", function (e) {
    $("#list").hide();
    $("#main").css("margin-left", "50px");
});

document.getElementById("btn_list_toggle").addEventListener("click", function (e) {
    if( $("#list").is(":visible") ){
        $("#list").hide();
        $("#main").css("margin-left", "50px");
    }else{
        $("#list").show();
        $("#main").css("margin-left", "350px");
    }
});

document.getElementById("btn_edit_new").addEventListener("click", function (e) {
    $("#list").hide();
    $("#main").css("margin-left", "50px");
    editorClear();
});