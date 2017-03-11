//globals
  //variable "demoHandlebarsData" contains data retrieved on page load available to helpers when they are called.   
  var ourHBdataStore = {}; //each table helper will populate this with both data and table state info
//helpers
Handlebars.registerHelper("sortableTableHelper",function(options){
  var colNames = (options.hash.colNames).split(',');
  //fancy colNames.. for display not for retrieval
  var colLabels = (options.hash.colLabels) ? (options.hash.colLabels).split(',') : colNames;
  // actionOptions extra data for actions (like a destination ID) - false if omitted
  var actionOptions = options.hash.actionOptions || false;
  // sort defaults '1,false' would be by col index 1 descending
  var orderSettingRaw = (options.hash.sortDefaults) ? (options.hash.sortDefaults).split(",") : [0, true];
  orderSettingRaw[1] = (orderSettingRaw[1] !== 'false');
  var orderSetting = [colNames[orderSettingRaw[0]], orderSettingRaw[1]];
  // Things will break with ajax calls within the handlebars helpers
  // Possible work around for dynamic replacement of helper data. https://www.npmjs.com/package/promised-handlebars
  // Make a copy of the individual tables' data to avoid changing sorts of shared reference by multiple tables using same data
  var copyOfItemData = JSON.parse(JSON.stringify(demoHandlebarsData[options.hash.dataKey]));
  var tableData = { colNames: colNames, colLabels:colLabels, items: copyOfItemData, checkAction: options.hash.checkAction, domID: options.hash.domContainerID, actionOptions: actionOptions , orderSetting: orderSetting};
  // Add sort state and Data to store, sort data by options, tableData.items gets sorted there by reference.
  addListToStore(tableData);
  // standard handlebars HTML generation: Get HB template, compile to function, feed it data, place in dom
  var makeDataTableTemplate =   document.getElementById("create-sortable-table").innerHTML;
  var makeDataTableBuilder = Handlebars.compile(makeDataTableTemplate);
  var builtMasterList = makeDataTableBuilder(tableData);
  // as this is a helper, the HTML will be returned, not inserted.
  return new Handlebars.SafeString(builtMasterList);  
});

// see conversation at https://gist.github.com/pheuter/3515945 - code taken from comments
// adds a tiny bit of logic to test for equality. used to display glyphicons for active sorting column.
Handlebars.registerHelper('ifeq', (a, b, options) => {
  if (a === b) {
    return options.fn(this);
  }
  return options.inverse(this);
});
// end helpers

function addListToStore(data){
  var domID = data.domID;
  ourHBdataStore[domID] = {};
  ourHBdataStore[domID].colNames= data.colNames;
  ourHBdataStore[domID].colLabels= data.colLabels;
  ourHBdataStore[domID].items= data.items;
  ourHBdataStore[domID].checkAction= data.checkAction;
  ourHBdataStore[domID].actionOptions= data.actionOptions;
  ourHBdataStore[domID].orderSetting = { col: data.orderSetting[0], ascend: data.orderSetting[1]};

  // adds a selected/ state to each data item imported
  // setAllUnchecked(data.items);
  // sort data by col and ascend/descend set or defaults(default is first column ascending)
  sortTable(domID, data.orderSetting[0], data.orderSetting[1]);
}

function redrawTable(domID){
  var makeDataTableTemplate =   document.getElementById("create-sortable-table").innerHTML;
  var thisTable = ourHBdataStore[domID];
  var tableData = { colNames: thisTable.colNames, colLabels: thisTable.colLabels, items : thisTable.items, checkAction: thisTable.checkAction, domID: domID, actionOptions: thisTable.actionOptions, orderSetting:[ thisTable.orderSetting.col, thisTable.orderSetting.ascend] };
  var makeDataTableBuilder = Handlebars.compile(makeDataTableTemplate);
  var builtMasterList = makeDataTableBuilder(tableData);
  document.getElementById(domID).innerHTML = builtMasterList;
}

function sortTable(domID, colName, ascend){
  var items = ourHBdataStore[domID].items;
  var compareColValsDescend = function(b,a){
    var aCol =  $.isNumeric(a[colName]) ? a[colName] : a[colName].toString().toLowerCase() ;
    var bCol =  $.isNumeric(b[colName]) ? b[colName] : b[colName].toString().toLowerCase() ;
    return ((aCol < bCol) ? -1 : 1);
  };
  var compareColValsAscend = function(a,b){
    var aCol =  $.isNumeric(a[colName]) ? a[colName] : a[colName].toString().toLowerCase() ;
    var bCol =  $.isNumeric(b[colName]) ? b[colName] : b[colName].toString().toLowerCase() ;
    return ((aCol < bCol) ? -1 : 1);
  };
  return ascend ? items.sort(compareColValsAscend): items.sort(compareColValsDescend);
}

function sortByCol(domID, colName){
  var tableorderSetting = ourHBdataStore[domID].orderSetting;
  if (colName === tableorderSetting.col){
    tableorderSetting.ascend = !tableorderSetting.ascend;
  }else{
    tableorderSetting.col = colName;
  }
  sortTable(domID, colName, tableorderSetting.ascend);
  redrawTable(domID);
}

function setAllUnchecked(items){
  items.forEach( function(e){
    e.selected = false;
  });
}