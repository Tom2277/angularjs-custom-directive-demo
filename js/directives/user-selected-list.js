angular
  .module('demo-directive-app')
  .directive('userSelectedList', userSelectedList);

  function userSelectedList(){

    return {
      templateUrl: 'templates/directives/user-selected-list.html'
    };
  };