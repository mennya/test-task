angular
	.module('agg.catalog')
	.config(config);

function config($stateProvider, nyMdIconProvider) {

	nyMdIconProvider
		.addShapes({
			'download': 'M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z',
			'book': 'M18,22A2,2 0 0,0 20,20V4C20,2.89 19.1,2 18,2H12V9L9.5,7.5L7,9V2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18Z'
		});

	$stateProvider.state('app.catalog', {
		url: '/catalog',
		views: {
			'content@app': {
				templateUrl: 'catalog.html',
				controller: 'CatalogController',
				controllerAs: 'vm',
				sections: {
					id: 'app.catalog',
					order: 1,
					title: 'Catalog',
					type: 'link',
					icon: 'book',
					show: true
				},
				resolve: {
					aggCatalog: 'aggCatalog',
					catalogs: function(aggCatalog){
						return aggCatalog.catalog.query().$promise;
					},
					title: function () {
						return 'Catalog';
					}
				}
			}
		}
	});

}