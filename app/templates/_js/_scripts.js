var URL_PARAMS = {};
var URL = '';
var TODAY = moment().format('DD/MM/YYYY');

$(document).ready(function(){
  init();
});

function init(){
  getQS();
}

function removeScripts(raw){

  raw = raw.replace(/<script src=/g, '<noscript class="script-src" data-script-url=');
  raw = raw.replace(/<script/g, '<noscript class="script-inline"');
  raw = raw.replace(/<\/script/g, "<\/noscript");
  raw = raw.replace(/onload=/g, "data-onload=");
  raw = raw.replace(/src=/g, "data-src=");

  return raw;
}


function getQS(){
  var match;
  var pl     = /\+/g;  // Regex for replacing addition symbol with a space
  var search = /([^&=]+)=?([^&]*)/g;
  var decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
  var query  = window.location.search.substring(1);

  while (match = search.exec(query)){
    URL_PARAMS[decode(match[1])] = decode(match[2]);
  }
}