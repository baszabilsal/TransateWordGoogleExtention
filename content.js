/*
chrome.storage.sync.remove('listvocabulary', function() {
    alert();
})
chrome.storage.sync.set({'listvocabulary':'Vocabulary'}, function() {
    alert('3');
})
*/
// check http for store Vocabulary


if((window.location.href).indexOf('translate.google.co.th')==(-1)){
chrome.storage.sync.get('listvocabulary', function(data) {
  if(data.listvocabulary!='Vocabulary'){
          var datasplit = data.listvocabulary.split(",");
          for(var i = 1;i<datasplit.length;i++){
             var passdata = datasplit[i].split("|")[0];

            document.body.innerHTML = document.body.innerHTML.replace(new RegExp(passdata, "i"), "<span style='background-color: red'>"+ passdata+"</span>");
          $("p:contains("+passdata+")").each(function(){

                  $(this).html($(this).html().replace(new RegExp(passdata, "i"),"<span style='background-color: red'>"+passdata+"</span>"));

                });
          }
        }
     });
    //highlight string in page

}
// save Vocabulary to storage
if((window.location.href).indexOf('translate.google.co.th')>(-1)){
    chrome.storage.sync.get('listvocabulary', function(data) {
    //set Vocabulary to storage
    // 1. in storage don't have  data. default is 'Vocabulary'

    if($('.gt-card-ttl-txt').first().text()!=''){
        if(data.listvocabulary=='Vocabulary'){
             var dummy = $.trim($('.gt-card-ttl-txt').first().text()).toLowerCase()+'|'+ $.trim($('#result_box').text());
            var a = data.listvocabulary +',' + dummy;
            chrome.storage.sync.set({'listvocabulary': a}, function() {
                 });
        }
    //2. in storage have any data
    if(data.listvocabulary!='Vocabulary'){
    var datasplit = data.listvocabulary.split(",");
    var check = false;

         for(var i = 0;i<datasplit.length;i++){
         if($('.gt-card-ttl-txt').first().text()==(datasplit[i].split("|"))[0]){
                check= true;
            }
        }
        if(check==false){
            var dummy = $.trim($('.gt-card-ttl-txt').first().text()).toLowerCase()+'|'+ $.trim($('#result_box').text());
            var k = data.listvocabulary +',' + dummy;

        chrome.storage.sync.set({'listvocabulary': k}, function() {
        });
    }
    }
}
    //chrome.runtime.sendMessage(data.listvocabulary);
        });

}





// request from popup browser
chrome.extension.onMessage.addListener(
function (request, sender, sendResponse) {
    if(request.action == 'Result')
    {
           var dm2 = {'source':$('gr_block').text(),'result':$('#result_box').text(),'dm':'data.value'};
        sendResponse(dm2);
    }
});

