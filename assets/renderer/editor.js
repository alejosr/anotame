function editorClear(){
    $("#editor").hide();
    $("#editor_title").val("");
    $("#editor_content").html("");
    $("#editor_info").html("");
    $("#editor").show();
    $("#editor_title").focus();
}

function editorCargarArchivo(file_path){
    ipcRenderer.send('app-read-file', file_path);
    $("#editor").hide();
    $("#editor_content").html("Hola Mundo")
    $("#editor_info").html(file_path);
    $("#editor").show();
}