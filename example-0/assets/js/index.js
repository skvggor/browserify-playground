var $ = require('jquery');
var S = require('string');

$(function() {
	var addBackground = function() {
		var texts = $('.wrapper p'),
			name = 'marcker';

		texts.each(function() {
			if (S($(this).text()).contains(name)) {
				$(this).addClass('-bg-red');
			};
		});
	}();
});
