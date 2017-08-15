/*
chrome.runtime.onMessage.addListener(function(response,sender,sendResponse){
alert(response);
 //chrome.storage.sync.set(response, function() {
          // Notify that we saved.
   //       alert('save');
        });

*/
chrome.contextMenus.create({
    title : "translate and store",
    contexts : ["selection"],
    onclick : opengoogletranslate
});

function opengoogletranslate(selected){

    chrome.tabs.create({url:"https://translate.google.co.th/#en/th/"+selected.selectionText});


}

