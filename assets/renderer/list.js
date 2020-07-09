function listHtmlElements(list, rama){
    let html = (rama>0) ? "<ul style='display:none'>" : "<ul>";

    list.forEach(function(v,i){
        if(v.type==0){
            html+=`<li class='file' onclick='editorCargarArchivo("${v.path}")'><i>${v.name}</i></li>`;
        }else{
            html+=`<li class='book' onclick='mostrar_hijos(this)'><b>${v.name}</b>` + listHtmlElements(v.content, rama+1) + `</li>`;
        }
    });
    html+="</ul>";
    return html;
}

function listRefresh(list){
    let html = listHtmlElements(list,0);
    $("#list_content").empty().append(html);
}


function mostrar_hijos(self){
    $(self).find("ul").first().toggle();
}