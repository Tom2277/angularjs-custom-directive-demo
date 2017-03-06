$( document ).ready(function() {
    $.get('templates/bootstrap-navbar.html', function(navBar) {
      $("#navBar").html(navBar);
    });

    redrawMasterList();
});


  var ratedList = [];
  var itemsInSet = starTrekChars ;//this could be made dynamic with more data

  //partials
  Handlebars.registerPartial("selectOne", $("#select-one-template").html());
  
  //helpers
  Handlebars.registerHelper( "masterItemsList",function( dataName , options){
    var stringName = Handlebars.Utils.escape(dataName)
    var data = { name : stringName, cols: options.hash.colArray, items: options.hash.list }
    var masterListBuilder = Handlebars.compile(masterListHTML);
    var builtMasterList = masterListBuilder(data);

    document.getElementById("master-list").innerHTML = builtMasterList;

  });

  function redrawMasterList(){
    Handlebars.registerPartial("selectOne", $("#select-one-template").html());

    var selCharList = document.getElementById("char-list-builder").innerHTML;
    var templateCharList = Handlebars.compile(selCharList);
    var withCharData = templateCharList( {chars: starTrekChars});

    document.getElementById("master-list").innerHTML = withCharData;
  }


  function redrawRatedList(){
    //call handlebars 
    
    var ratedListBuilder = document.getElementById("rated-list-builder").innerHTML;
    var templateRatedList = Handlebars.compile(ratedListBuilder);
    var currentRated = templateRatedList( {ratedItems: ratedList});

    
    document.getElementById("rated-list").innerHTML = currentRated;
  }

  