var urls = [];

/**
 * Load pinned links from chrome storage on load
 */
window.onload = () => {

  chrome.storage.local.get('URLS', function (result) {
    if(result.URLS.length > 0) {
      urls = result.URLS;
      // populate in HTML
      populateList(urls);
    }
  }); 

  chrome.tabs.getSelected(null,function(tab) {
    var tablink = tab.url;
    document.getElementById("URL").value = tablink;
  });
}

/**
 * Add value which was input to chrome storage and show in html
 */
document.getElementById("btn1").onclick = () => { 
  var Input = document.getElementById('URL');
  var url = Input.value;
  if(!url.length == 0){
  urls.push(url);
  // set to chrome storage
  chrome.storage.local.set({URLS: urls});
  // add value to HTML
  addToHTML(url);
  // clear input value
  Input.value = "";
  }
}

/**
 * 
 * @param {string} value 
 * Add value supplied to the list in the html
 */
function addToHTML(value) {
  console.log(value);
  var link = value;  

  //create div
  var div = document.createElement("div");
  div.className = "div";
  div.id = link;

  // make anchor tag out of value passed
  var anchorTag = document.createElement("a");
  anchorTag.id = "link";
  anchorTag.setAttribute("href", link);
  anchorTag.setAttribute("target", "_blank");
  
  //create li
  var li = document.createElement("li");
  li.id = "element";

  //delete icon
  var remove = document.createElement("a");
  remove.className = "remove";
  var i = document.createElement("i");
  i.className = "fa fa-times-circle"; 

  //img tag
  var img = document.createElement("img");
  img.id = "logo";
  img.src = 'https://api.statvoo.com/favicon/?url='+link;
  var src = document.getElementById("list");
  src.appendChild(img);

  //appending
  remove.appendChild(i);
  li.appendChild(img);
  anchorTag.appendChild(li);
  div.appendChild(remove);
  div.appendChild(anchorTag);
  document.getElementById("list").appendChild(div);

  //delete function
  remove.onclick = function() {
    var elem = document.getElementById(link);
    elem.parentNode.removeChild(elem);
    del(link);
  }
}

/**
 * 
 * @param {Array} values 
 * Populate list based on the array of links passed
 */
function populateList(values) {
  console.log(values);
  // ES6 function, similar to foreach
  values.map((url) => {
    // add to HTML each value from the array
    addToHTML(url);
  })
}

/**
 * 
 * @param {Array} values 
 * Add value supplied to the list in the html
 */
function del (theURL){

  chrome.storage.local.get('URLS', function(result) {
    var theList = result['URLS'];

    // create a new array without url
    var newUrlList = theList.filter(function(item) { 
      return item !== theURL;
    });
    
    // set new url list to the storage
    chrome.storage.local.set({ 'URLS': newUrlList });
  });
}