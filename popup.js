myApp.service('pageInfoService', function() {
    this.getInfo = function(callback) {
        var model = {};

        chrome.tabs.query({'active': true},
        function (tabs) {
            if (tabs.length > 0)
            {
                chrome.tabs.sendMessage(tabs[0].id,{'action':'Result'},function(response){
                    model.source = response.source;
                    model.result = response.result;
                    model.dm = response.dm;
                    callback(model);
                })
            }

        });
    };
});

myApp.controller("translatestorecontroller", function ($scope, pageInfoService,$http) {

    $scope.message = "Translate Store";
    pageInfoService.getInfo(function (info) {
        $scope.result = info.result;
        $scope.source = info.source;
        $scope.$apply();
    });
    chrome.storage.sync.get('value', function(data) {
            $scope.dm3 = data.value;
        });
});



