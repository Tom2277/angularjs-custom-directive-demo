angular
  .module('demo-directive-app')
  .directive('demoCommentaryOne', demoCommentaryOne);

  function demoCommentaryOne(){

    return {
      templateUrl: 'templates/demo-commentary-one.html'
    };
  };