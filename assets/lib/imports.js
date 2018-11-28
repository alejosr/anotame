const links = document.querySelectorAll('link[rel="import"]')

// Import and add each page to the DOM
Array.prototype.forEach.call(links, (link) => {
    let template = link.import.querySelector('template');
    let clone = document.importNode(template.content, true);
    let destiny = template.getAttribute("destiny");
    if(destiny){
        document.querySelector(destiny).appendChild(clone)
    } else {
        document.querySelector('body').appendChild(clone)
    }
});
