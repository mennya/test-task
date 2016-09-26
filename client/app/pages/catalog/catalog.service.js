angular
	.module('agg.catalog')
	.factory('aggCatalog', AggCatalog);

function AggCatalog($resource, APP_CONSTS) {

	function transformResponse(data) {
		var res = JSON.parse(data);
		if (!angular.isArray(res)) res =[];
		return res;
	}

	return {
		catalog: $resource(APP_CONSTS.API_HOST + 'public/catalog/:id', {id: '@id'},
			{
				get: {method: 'GET', isArray: false},
				query: {method: 'GET', isArray: true, transformResponse: transformResponse}
			}
		),
		bundle: $resource(APP_CONSTS.API_HOST + 'public/catalog/:id/bundles', {id: '@id'},
			{
				query: {method: 'GET', isArray: true, transformResponse: transformResponse}
			}
		)
	}
}