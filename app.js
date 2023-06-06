  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('ApiBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json');

NarrowItDownController.$inject = ['MenuSearchService'];

function NarrowItDownController(MenuSearchService) {
  var narrowCtrl = this;
  narrowCtrl.searchTerm = '';
  narrowCtrl.foundItems = [];

  narrowCtrl.narrowDown = function () {
    if (narrowCtrl.searchTerm.trim() !== '') 
    {
      var promise = MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm);

      promise.then(function (foundItems) {
        narrowCtrl.foundItems = foundItems;
      });
    }
    else 
    {
      narrowCtrl.foundItems = [];
    }
  };

  narrowCtrl.removeItem = function (index) {
    narrowCtrl.foundItems.splice(index, 1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: 'GET',
      url: ApiBasePath
    }).then(function (response) {
      var menuItems = response.data;

      var foundItems = menuItems.filter(function (item) {
        return item.description.indexOf(searchTerm) !== -1;
      });

      return foundItems;
    });
  };
}

function FoundItemsDirective() {
  var ddo = {
    restrict: 'E',
    scope: {
      found: '<',
      onRemove: '&'
    },
    templateUrl: 'foundItems.html'
  };

  return ddo;
}
