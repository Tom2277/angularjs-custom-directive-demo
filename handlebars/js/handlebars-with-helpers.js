$( document ).ready(function() {
    $.get('templates/bootstrap-navbar.html', function(navBar) {
      $("#navBar").html(navBar);
    });

    // there is a global variable "demoHandlebarsData" object/ you could get data via ajax instead
     
    initMain();

});
  var ourHBdataStore = {} //will hold region list data created by helpers
  var toggleOrder = true; //todo: get rid of this global initiator;

  function initMain(){
    var forMainTemplate = document.getElementById("for-main").innerHTML;
    var forMainBuilder = Handlebars.compile(forMainTemplate);
    var forMainHTML = forMainBuilder(this);

    document.getElementById("main-content").innerHTML = forMainHTML;
  }
  
  function addListToStore(data){
    console.log("did toDisplay get to storage? : ", data.toDisplay)
    ourHBdataStore[data.domID] = {};
    ourHBdataStore[data.domID].listName= data.listName;   
    ourHBdataStore[data.domID].colNames= data.colNames;   
    ourHBdataStore[data.domID].items= data.items;   
    ourHBdataStore[data.domID].checkAction= data.checkAction;
    ourHBdataStore[data.domID].toDisplay= data.toDisplay;

    setAllUnchecked(data.items);
  }

  //helpers
  Handlebars.registerHelper("makeDataTable",function(options){
      var makeDataTableTemplate =   document.getElementById("make-data-table").innerHTML;
      var colNames = (options.hash.colNames).split(',');
      var toDisplay = options.hash.toDisplay || false;
      console.log("display is : ", toDisplay);
      // we could wrap the following in an ajax call to retrieve external items data
      var tableData = { colNames: colNames, items : demoHandlebarsData[options.hash.listName], listName: options.hash.listName, checkAction: options.hash.checkAction, domID: options.hash.domContainerID, toDisplay: toDisplay };
      addListToStore(tableData);
      var makeDataTableBuilder = Handlebars.compile(makeDataTableTemplate);
      var builtMasterList = makeDataTableBuilder(tableData);

      return new Handlebars.SafeString(builtMasterList);
  });

  function redrawTable(domID){
    var makeDataTableTemplate =   document.getElementById("make-data-table").innerHTML;
    var thisTable = ourHBdataStore[domID];
    var tableData = { colNames: thisTable.colNames, items : thisTable.items, listName: thisTable.listName, checkAction: thisTable.checkAction, domID: domID, toDisplay: thisTable.toDisplay };
    var makeDataTableBuilder = Handlebars.compile(makeDataTableTemplate);
    var builtMasterList = makeDataTableBuilder(tableData);
    var IDdomID = "#" + domID;
    $(IDdomID).html(builtMasterList);
  }  

  function sortByCol(domID, colName){
    console.log('got to sortByCol domID, colName', domID, colName);
    toggleOrder = !toggleOrder;
    // colName = "title";
    var items = ourHBdataStore[domID].items;
    ourHBdataStore[domID].items = toggleOrder ? items.sort(function(a,b){ return a[colName] - b[colName]}) : items.sort(function(a,b){ return b[colName] - a[colName]});
    redrawTable(domID);
  }



  function chooseDisplayItem(domID, index){
    // console.log("first the domID and then the index", domID, index);
    var thisTable = ourHBdataStore[domID]
    var items = thisTable.items;
    var displayCol = thisTable.toDisplay;
    var displayTitle = thisTable["colNames"][0];
    var displayAlt = items[index][displayTitle];
    var displayString = items[index][displayCol];
    console.log("displayCol is : ", displayCol);
    setAllUnchecked(items);
    // this functions as a select table - you cannot uncheck an item
    items[index].selected = true;
    redrawTable(domID);
    drawDisplayItem(domID, displayString, displayAlt);
  }

  function drawDisplayItem(domID, string, alt){
    var domIdDisplay = '#' + domID + "display";
    console.log("the domIdDisplay", domIdDisplay);
    //only handles photos currently - could do a regex looking for a photo extension
    var displayContent = '<img src="' + string + '" alt="' + alt + '">';
    $(domIdDisplay).html(displayContent);
  }

  function chooseRatingItem(domID, index){
    console.log("first the domID and then the index", domID, index);
  }


  function setAllUnchecked(items){
    items.forEach( function(e){
      e.selected = false;
    })
  }