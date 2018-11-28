function nf_refresh(list){
    let content = document.querySelector("#leftbar");
    let html = `<ul>`;
    list.forEach(function(v,i){
        html+=`<li>${v.name}</li>`;
    });
    html+=`</ul>`;
    content.appendChild(html);
}