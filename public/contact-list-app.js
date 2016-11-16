angular.module("ContactListApp",["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
            .when("/",{
                controller: "ListCtrl",
                templateUrl: "list.html"
            })
            .when("/contacts/:name",{
                controller: "EditCtrl",
                templateUrl: "edit.html"
            })
    });