angular
	.module('agg.core')
	.directive('httpProgress', httpProgress);

function httpProgress($http) {
	return {
		template: '<md-progress-linear class="spinner md-warn" md-mode="query"></md-progress-linear>',
		link: function link($scope, element) {
			$scope.isLoading = function isLoading() {
				return $http.pendingRequests.length > 0;
			};

			$scope.$watchCollection($scope.isLoading, function watchCollection(loading) {
				if (loading) {
					element.removeClass('ng-hide');
				} else {
					element.addClass('ng-hide');
				}
			});


		}
	};
}