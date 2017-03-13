$( document ).ready(function() {
    $.get('/non-routed-navbar.html', function(navBar) {
      $("#navBar").html(navBar); //this is not a handlebars template - pure HTML
    });

    $.getJSON('/handlebars/demo-data.json',function(EXTdata, status){
      //store retrieved data within the a global available to helpers
      //you might need mutiple api calls here to populate working data 
      //(see notes in handlebars-sortable-table.js)
      demoHandlebarsData = EXTdata["demoHandlebarsData"];

      initMain();

    });

});
  

//create and insert page layout
function initMain(){
  var forMainTemplate = document.getElementById("for-main").innerHTML;
  var forMainBuilder = Handlebars.compile(forMainTemplate);
  var forMainHTML = forMainBuilder(this);

  document.getElementById("main-content").innerHTML = forMainHTML;
}



// from http://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage?rq=1 
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}