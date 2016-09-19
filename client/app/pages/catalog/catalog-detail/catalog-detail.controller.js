angular
	.module('agg.catalog.detail')
	.controller('CatalogDetailController', CatalogDetailController);

function CatalogDetailController(catalog, bundles, aggStorage, $http) {
	var vm = this;

	vm.bundles = bundles;
	vm.catalog = catalog;
	vm.storage = aggStorage;

}