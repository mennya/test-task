angular
	.module('agg.catalog')
	.factory('aggCatalog', AggCatalog);

function AggCatalog($resource, APP_CONSTS) {
	return {
		catalog: $resource(APP_CONSTS.API_HOST + 'public/catalog/:id', {id: '@id'},
			{
				get: {method: 'GET', isArray: false},
				query: {method: 'GET', isArray: true}
			}
		),
		bundle: $resource(APP_CONSTS.API_HOST + 'public/catalog/:id/bundles', {id: '@id'},
			{
				query: {method: 'GET', isArray: true}
			}
		)
	}
}