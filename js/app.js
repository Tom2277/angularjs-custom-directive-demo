(function(){
  'use strict'

  angular
    .module('demo-directive-app',['ngStorage', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider){

      var helloState = {
        name: 'hello',
        url: '/',
        templateUrl: 'templates/home.html'
      }


      var aboutState = {
        name: 'about',
        url: '/about',
        template: '<h3>You have reached the about page!</h3><p>...but this is a single page app?</p>'
      }


      var directiveDemo = {
        name: 'angular-directive-demo',
        url: '/angular-directive-demo',
        templateUrl:'templates/two-col-demo-page.html'
      }

      var sortableTable = {
        name: 'sortable-table-directive',
        url: '/sortable-table-directive',
        templateUrl:'templates/sortable-table-directive-page.html'
      }


      $urlRouterProvider
        .otherwise('/');

      $stateProvider.state(helloState);
      $stateProvider.state(aboutState);
      $stateProvider.state(directiveDemo);
      $stateProvider.state(sortableTable);
    })
    
})()