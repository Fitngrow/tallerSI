angular.module("ContactListApp")
    .controller("EditCtrl", function($scope, $http, $routeParams){
        console.log("Edit controller initialized");

        $http.get("/api/v1/contacts/"+$routeParams.name).success(function(contact){
            $scope.contact = contact;
        })

        $scope.updateContact = function(){
            var contact = $scope.contact;
            $http.put("/api/v1/contacts/"+contact.name, contact).success(function(e){
                console.log("TODO OK");
            })
        }
    });