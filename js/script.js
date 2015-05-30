var myApp = angular.module('myApp', ['ngRoute']);

    //  use the config method to set up routing:
    myApp.config(function ($routeProvider) {
      $routeProvider
        .when('/',{
            templateUrl: 'partials/orders.html'
        })
        .when('/customers',{
            templateUrl: 'partials/customers.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

    myApp.factory('ordersFactory', function(){
      //customers stuff
      var errors = {};
      var customers = [
          {name:'John Doe', created: '2015-04-02'},
          {name:'Jane Doe', created: '2015-04-02'},
          {name:'April Doe', created: '2015-05-02'},
          {name:'Zoe Doe', created: '2015-05-02'}
        ];
        //order stuff
        var products =  [
          {product:'Soup'},
          {product:'Pizza'},
          {product:'Ice Cream'},
          {product:'Candy'}
        ];
        var quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        var orders = [
          {name:'Dog Doe', product: 'Ice Cream', quantity: 5, created: '2015-04-02'},
          {name:'Cat Doe', product: 'Candy', quantity: 5, created: '2015-05-02'}
        ];
        var factory = {};
        factory.getCustomers = function(callback){
          callback(customers);
        }; 
        factory.addCustomer = function(data){
          for (var i=0; i<customers.length; i++){
            if(data.name === customers[i].name){
              errors.message = "The name already exists.";
              return false;
            }
          }
          customers.push({name: data.name, created: Date()});        
        };
        factory.errorMessages = function(){
          return errors;
        };
        factory.removeCustomer = function(name){
          customers.splice(customers.indexOf(name), 1);
        };

        factory.getProducts = function(callback){
          callback(products);
        };
        factory.getQuantities = function(callback){
          callback(quantities);
        };
        factory.getOrders = function(callback){
          callback(orders);
        };
        factory.addOrder = function(data){
          // console.log(data);
          orders.push({name: data.name, product: data.product, quantity: data.quantity, created: Date()});   
        };
        factory.removeOrder = function(name){
          orders.splice(orders.indexOf(name), 1);
        };        
        
        return factory;
    });

    myApp.controller('customersController', function ($scope, ordersFactory){
        $scope.customers = [];
        $scope.errors = {};
        ordersFactory.getCustomers(function(data){
          $scope.customers = data;
        });  
        $scope.addCustomer = function(){
          ordersFactory.addCustomer($scope.newCustomer);
          $scope.newCustomer = {};
        };
        $scope.errors = ordersFactory.errorMessages();
        $scope.removeCustomer= function(name){
          ordersFactory.removeCustomer(name);
        }
    });

    //order controller
    myApp.controller('ordersController', function ($scope, ordersFactory){
        $scope.orders = [];
        // $scope.customers = [];
        $scope.products = [];
        $scope.quantities = [];
        ordersFactory.getOrders(function(data){
          $scope.orders = data;
        });
        ordersFactory.getCustomers(function(data){
          $scope.customers = data;
        });
        ordersFactory.getProducts(function(data){
          $scope.products = data;
        });
        ordersFactory.getQuantities(function(data){
          $scope.quantities = data;
        });
        $scope.addOrder = function(){
          // console.log($scope.newOrder);
          // console.log($scope.newOrder);
          ordersFactory.addOrder($scope.newOrder);
          $scope.newOrder = {};
        };
        $scope.removeOrder= function(name){
          ordersFactory.removeOrder(name);
        }
    });