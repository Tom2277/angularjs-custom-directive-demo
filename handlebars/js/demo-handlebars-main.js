$( document ).ready(function() {
    $.get('/templates/bootstrap-navbar.html', function(navBar) {
      $("#navBar").html(navBar); //this is not a handlebars template - pure HTML
    });
    
    initMain();

});
  

//create and insert page layout
function initMain(){
  var forMainTemplate = document.getElementById("for-main").innerHTML;
  var forMainBuilder = Handlebars.compile(forMainTemplate);
  var forMainHTML = forMainBuilder(this);

  document.getElementById("main-content").innerHTML = forMainHTML;
}