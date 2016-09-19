angular
	.module('agg.core.sidenav')
	.directive('menuLink', menuLink);

function menuLink(
	aggMenu
) {
	return {
		scope: {
			section: '='
		},
		templateUrl: 'tmenu-link.html',
		link: function link($scope, elem) {

			if ($scope.section.click) {
				elem[0].firstChild.setAttribute('ng-click', $scope.section.click);
			}

			$scope.isSelected = isSelected;

			function isSelected() {
				return aggMenu.isPageSelected($scope.section);
			}

		}
	};
}