var ITEM_INDEX = CD.param('mi_item_index');
var URL = '';

init();

function init(){
  
  // CD.getCORS(url, renderContent);
  
}

function renderContent(raw){

  raw = raw.replace(/<script src=/g, '<noscript class="mi-script-src" data-script-url=');
  raw = raw.replace(/<script/g, '<noscript class="mi-script-inline"');
  raw = raw.replace(/<\/script/g, "<\/noscript");
  raw = raw.replace(/onload=/g, "data-onload=");
  raw = raw.replace(/src=/g, "data-src=");

}

