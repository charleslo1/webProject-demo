/**
 * roots
 * @type {Object}
 */
module.exports = {
	// browser roots
	win: window,
	doc: document,
	$win: $(window),
	$doc: $(document),
	
	// dom roots
	html: document.documentElement,
	body: document.body,
	$html: $('html'),
	$body: $('body'),

	// app roots
	hander: $('.js-header').get(0),
	aside: $('.js-aside').get(0),
	offsidebar: $('.js-offsidebar').get(0),
	content: $('.js-content').get(0),
	footer: $('.js-footer').get(0),
	$hander: $('.js-header'),
	$aside: $('.js-aside'),
	$offsidebar: $('.js-offsidebar'),
	$content: $('.js-content'),
	$footer: $('.js-footer')
};