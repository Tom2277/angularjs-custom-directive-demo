angular
  .module('demo-directive-app')
  .directive('userSelectedList', userSelectedList);

  function userSelectedList(){

    return {
      templateUrl: 'templates/user-selected-list.html'
    };
  };