angular
	.module('agg.catalog')
	.controller('CatalogController', CatalogController);

function CatalogController(catalogs, aggStorage) {
	var vm = this;

	vm.catalogs = catalogs;
	vm.storage = aggStorage;

}