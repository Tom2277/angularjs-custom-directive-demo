$( document ).ready(function() {
    $.get('templates/bootstrap-navbar.html', function(navBar) {
      $("#navBar").html(navBar);
    });
});