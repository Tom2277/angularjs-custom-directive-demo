angular
  .module('demo-directive-app')
  .directive('bootstrapNavbar', bootstrapNavbar);

  function bootstrapNavbar(){

    return {
      templateUrl: 'templates/bootstrap-navbar-angular-ui.html'
    };
  };