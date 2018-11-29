function nf_listhtml(list, rama){
    let html = (rama>0) ? "<ul style='display:none'>" : "<ul>";

    list.forEach(function(v,i){
        if(v.type==0){
            html+=`<li class='file' onclick='mostrar_archivo("${v.path}")'><i>${v.name}</i></li>`;
        }else{
            html+=`<li class='book' onclick='mostrar_hijos(this)'><b>${v.name}</b>` + nf_listhtml(v.content, rama+1) + `</li>`;
        }
    });
    html+="</ul>";
    return html;
}

function nf_refresh(list){
    console.log(list)
    let html = nf_listhtml(list,0);
    $("#list-content").empty().append(html);
}


function mostrar_hijos(self){
    $(self).find("ul").first().toggle();
}

function mostrar_archivo(path){
    $("#editor").hide();
    $("#ed_content").html("Hola Mundo")
    $("#ed_info").html(path);
    $("#editor").show();
}