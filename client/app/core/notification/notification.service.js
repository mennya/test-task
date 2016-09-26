angular
	.module('agg.core')
	.service('notification', notification);

function notification($injector) {

	this._$injector = $injector;

	this._mdToast;

}

notification.prototype._getmdToast = function () {
	if (!this._mdToast) this._mdToast = this._$injector.get('$mdToast');
	return this._mdToast;
};

notification.prototype._show = function (text, theme) {
	this._getmdToast().show(
		this._getmdToast().simple()
			.textContent(text)
			.position('right top')
			.hideDelay(3000)
			.theme(theme)
	);
};

/**
 * show error message
 * @param text
 */
notification.prototype.error = function (text) {
	this._show(text, 'error-toast');
};

/**
 * show success message
 * @param text
 */
notification.prototype.success = function (text) {
	this._show(text, 'success-toast');
};

/**
 * show warning message
 * @param text
 */
notification.prototype.warning = function (text) {
	this._show(text, 'warning-toast');
};

/**
 * show primary message
 * @param text
 */
notification.prototype.primary = function (text) {
	this._show(text, 'primary-toast');
};