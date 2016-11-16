angular.module("ContactListApp")
    .controller("ListCtrl", ($scope)=>{
        console.log("List controller initialized");

        $scope.test = "test";
        $scope.contactList = [{ name: "pedro", phone: 123456789, email: "pedro@pedro.com"},
                              { name: "pepe",  phone: 611112223, email: "pepe@pepe.com"  }];
    });