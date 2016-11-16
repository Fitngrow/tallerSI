angular.module("ContactListApp")
    .controller("ListCtrl", ($scope, $http)=>{
        console.log("List controller initialized");

        $http.get("/api/v1/contacts").success((contacts)=>{
            $scope.contactList = contacts;
        });

    });