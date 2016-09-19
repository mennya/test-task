angular
	.module('agg.main')
	.config(config);

function config($stateProvider) {

	$stateProvider.state('app.main', {
		url: '/',
		views: {
			'content@app': {
				templateUrl: 'main.html',
				resolve: {
					title: function () {
						return 'Main';
					}
				}
			}
		}
	});

}