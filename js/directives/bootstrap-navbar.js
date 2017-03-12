// this simple directive inserts the bootstrap navbar 
// with links configured for the angular-ui-router 'ui-ref'
angular
  .module('demo-directive-app')
  .directive('bootstrapNavbar', bootstrapNavbar);

  function bootstrapNavbar(){

    return {
      templateUrl: 'templates/directives/bootstrap-navbar-angular-ui.html'
    };
  };