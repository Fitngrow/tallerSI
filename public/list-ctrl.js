angular.module("ContactListApp")
    .controller("ListCtrl", ($scope, $http)=>{
        console.log("List controller initialized");

        function refresh(){
            $http.get("/api/v1/contacts").success((contacts)=>{
                $scope.contactList = contacts;
            });
        }

        $scope.addContact = () => {
            var newContact = $scope.newContact;
            $http.post("/api/v1/contacts", newContact).success((e)=>{
                refresh();
                $scope.newContact = {};
            })
        };

        $scope.deleteContact = (name) =>{
            $http.delete("/api/v1/contacts/"+name).success((e)=>{
                refresh();
            })
        };
        
        refresh();

    });