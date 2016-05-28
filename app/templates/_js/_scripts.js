var URL_PARAMS = {};
var URL = '';

init();

function init(){
  getQS();
  // CD.getCORS(url, renderContent);
}

function renderContent(raw){

  raw = raw.replace(/<script src=/g, '<noscript class="mi-script-src" data-script-url=');
  raw = raw.replace(/<script/g, '<noscript class="mi-script-inline"');
  raw = raw.replace(/<\/script/g, "<\/noscript");
  raw = raw.replace(/onload=/g, "data-onload=");
  raw = raw.replace(/src=/g, "data-src=");

}


function getQS(){
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    while (match = search.exec(query))
       URL_PARAMS[decode(match[1])] = decode(match[2]);
}