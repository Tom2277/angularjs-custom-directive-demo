angular
  .module('demo-directive-app')
  .controller('PhotoDisplayController', PhotoDisplayController);

  PhotoDisplayController.$inject = ['$scope', '$localStorage'];

  function PhotoDisplayController($scope, $localStorage){
    var vm = this;

    // NOTE - this is a hardwired very simple controller made only to show the sortable table
    // directive in action. 
    // To see how you would structure a controller for flexible repeated use 
    // see my handlebars-sortable-table-helper repo at GitHub.
    // The use of global variables within internal functions is NOT!!! the way to do it.
    vm.itemsInSet = tomsPhotos;
    vm.$storage = $localStorage.$default({
      chosenPhoto: vm.itemsInSet[0]
    });
    vm.chosenPhoto = vm.$storage.chosenPhoto;

    vm.pickPhoto = pickPhoto;
    setItemsSelected();                             // should pass a list

    function setItemsSelected(){                    // avoid this
      vm.itemsInSet.forEach(function(item){
        if (vm.chosenPhoto.title === item.title){   // avoid this hardwired reference
          item.selected = true;
        }else{
          item.selected = false;
        }       
      });
    }

    function pickPhoto(selectedItem){
      vm.chosenPhoto = selectedItem;                // again.. just for the demo
      vm.$storage.chosenPhoto=selectedItem;
      setItemsSelected();
    }
  }
