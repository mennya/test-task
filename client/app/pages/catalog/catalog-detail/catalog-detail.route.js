angular
	.module('agg.catalog.detail')
	.config(config);

function config($stateProvider) {

	$stateProvider.state('app.catalog.detail', {
		url: '/:id',
		views: {
			'content@app': {
				templateUrl: 'catalog-detail.html',
				controller: 'CatalogDetailController',
				controllerAs: 'vm',
				resolve: {
					aggCatalog: 'aggCatalog',
					catalog: function (aggCatalog, $stateParams) {
						return aggCatalog.catalog.get({id: $stateParams.id}).$promise;
					},
					bundles: function (catalog, aggCatalog) {
						if (!catalog.id) return [];
						return aggCatalog.bundle.query({id: catalog.id}).$promise;
					},
					title: function (catalog) {
						if (!catalog.title) return '404';
						return catalog.title.default;
					},
					backState: function () {
						return 'app.catalog';
					}
				}
			}
		}
	});

}