angular
	.module('agg.core')
	.config(function ($httpProvider) {
		$httpProvider.interceptors.push('errorHandlerInterceptor');
	});

angular
	.module('agg.core')
	.factory('errorHandlerInterceptor', errorHandlerInterceptor);

function errorHandlerInterceptor($q, $injector) {
	var toastr;

	function getToaster() {

		if (!toastr) {
			toastr = $injector.get('$mdToast');
		}

		return toastr;
	}

	function notify(text) {
		getToaster().show(
			getToaster().simple()
				.textContent(text)
				.position('right top')
				.hideDelay(3000)
		);
	}

	return {
		'response': function (response) {
			// do something on success
			return response || $q.when(response);
		},

		'responseError': function (rejection) {

			switch (rejection.status) {
				case 400:
					notify('Bad request.');
					break;
				case 404:
					notify('Sorry, requested resource not found :(');
					break;
				case 500:
					notify('Sorry, something went wrong. The server returned a 500 "Internal Server Error" ');
					break;
			}

			return $q.resolve(rejection);
		}
	};
}
