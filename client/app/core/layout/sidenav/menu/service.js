angular
	.module('agg.core.sidenav')
	.service('aggMenu', AggMenu);

function AggMenu($state, $rootScope) {
	/** @private */
	this._$rootScope = $rootScope;
	/** @private */
	this._$state = $state;

	/**
	 * main navigation routes
	 * {!Array<string>}
	 */
	this.navRoutes;

	this.openedSection;

	this._init();

}

AggMenu.prototype._init = function () {
	var that = this;
	var _states = this._$state.get();

	this.navRoutes = this._getNavRoutes(_states);

	this._$rootScope.$on('$stateChangeSuccess', _onLocationChange);

	function _onLocationChange(e, toState) {

		function matchPage(section, page) {
			if (toState.name && toState.name.indexOf(page.sref) !== -1) {
				that._selectSection(section);
				that._selectPage(section, page);
			}
		}

		_.forEach(that.navRoutes, function forEach(section) {
			if (section.children) {
				section.children.forEach(function forEach(childSection) {
					if (childSection.pages) {
						childSection.pages.forEach(function forEach(page) {
							matchPage(childSection, page);
						});
					}
				});
			} else if (section.pages) {
				section.pages.forEach(function forEach(page) {
					matchPage(section, page);
				});
			} else if ('link' === section.type) {
				matchPage(section, section);
			}
		});
	}

};

/** @private */
AggMenu.prototype._selectPage = function (section, page) {
	this.openedSection = section;
	this.currentPage = page;
};

/** @private */
AggMenu.prototype._selectSection = function (section) {
	this.openedSection = section;
};

AggMenu.prototype.toggleSelectSection = function (section) {
	this.openedSection = (this.openedSection === section ? null : section);
};

AggMenu.prototype.isSectionSelected = function (section) {
	return this.openedSection === section;
};

/**
 * isPageSelected
 * @param page
 * @returns {boolean}
 */
AggMenu.prototype.isPageSelected = function (page) {
	return this.currentPage === page;
};

/** @private */
AggMenu.prototype._getNavRoutes = function (_states) {
	var pages;
	var nav;
	var states = [];

	_.forEach(_states, function (item) {
		_.forEach(item.views, function (fItem) {
			states.push(fItem);
		});
	});

	nav = _.chain(states)
		.forEach(function each(item) {
			if (item.sections && 'link' === item.sections.type) {
				item.sections.sref = item.sections.id;
			}
		})
		.mapValues('sections')
		.filter('show')
		.filter('order')
		.orderBy('order')
		.value();

	pages = _.chain(states)
		.forEach(function each(item) {
			if (item.pages) {
				item.pages.title = item.title;
				item.pages.sref = item.name;
			}
		})
		.mapValues('pages')
		.filter('order')
		.orderBy('order')
		.groupBy('section')
		.value();

	_.forEach(nav, function each(item) {
		item['pages'] = pages[item.id];
	});

	return nav;

};