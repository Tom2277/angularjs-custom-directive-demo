// this is to insert one of two navbar templates into the dom 
// use this file for NON-AngularJS pages
$( document ).ready(function() {
    $.get('/non-routed-navbar.html', function(navBar) {
      $("#navBar").html(navBar);
    });
});