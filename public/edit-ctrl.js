angular.module("ContactListApp")
    .controller("EditCtrl", function($scope, $http, $routeParams, $location){
        console.log("Edit controller initialized");

        $http.get("/api/v1/contacts/"+$routeParams.name).success(function(contact){
            $scope.contact = contact;
        });

        $scope.updateContact = function(){
            var contact = $scope.contact;
            $http.put("/api/v1/contacts/"+contact.name, contact).success(function(e){
                showSnackbar("Contact edited");
                $location.path("/")
            })
        };

        function showSnackbar(message){
                var message = message || "Hello world";
                // Get the snackbar DIV
                var x = document.getElementById("snackbar");
                // Add the "show" class to DIV
                x.className = "show";
                x.innerHTML = message;
                // After 3 seconds, remove the show class from DIV
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
    });