angular
	.module('agg.core.sidenav')
	.directive('menuToggle', menuToggle);

function menuToggle($mdUtil, $timeout, aggMenu) {
	return {
		scope: {
			section: '='
		},
		templateUrl: 'tmenu-toggle.html',
		link: function link(scope, element) {
			var parentNode = element[0].parentNode.parentNode.parentNode;
			var sidenav = element[0].parentNode.parentNode.parentNode.parentNode;
			var heading;

			scope.isOpen = isOpen;
			scope.toggle = toggle;
			scope.icon = 'arrow_drop_down';

			$mdUtil.nextTick(function nextTick() {
				scope.$watch(
					function watchWhat() {
						return isOpen(scope.section);
					},

					function wathAction(open) {
						var $ul = element.find('ul');
						var targetHeight = open ? getTargetHeight() : 0;

						$timeout(function time() {
							$ul.css({height: targetHeight + 'px'});
						}, 0, false);

						function getTargetHeight() {
							var targetHeight;
							var removed;

							if (sidenav.classList.contains('md-closed')) {
								sidenav.classList.remove('md-closed');
								removed = true;
							}

							$ul.addClass('no-transition');
							$ul.css('height', '');
							targetHeight = $ul.prop('clientHeight');
							$ul.css('height', 0);
							$ul.removeClass('no-transition');

							if (removed) {
								sidenav.classList.add('md-closed');
							}

							return targetHeight;
						}
					}
				);
			});

			function isOpen(s) {
				return aggMenu.isSectionSelected(scope.section);
			}

			function toggle() {
				aggMenu.toggleSelectSection(scope.section);
			}

			if (parentNode.classList.contains('parent-list-item')) {
				heading = parentNode.querySelector('h2');
				element[0].firstChild.setAttribute('aria-describedby', heading.id);
			}
		}
	};
}