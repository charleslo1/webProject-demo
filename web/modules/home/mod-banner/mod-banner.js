// require
var Swiper = require('coms/swiper/swiper')

// init
exports.init = function () {
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		paginationClickable: true
	});
};