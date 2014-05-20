var request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs');

var domains = ['', 'garage', 'portfolio', 'drinks', 'blog', 'about', 'jobs'];
domains.forEach(function(path) {
	console.log(path);
	request('http://upstatement.com/', function(error, response, body) {
		if (!error) {
			var $ = cheerio.load(body);

			$('img').each(function(index, value) {
				var uri = value.attribs.src;
				var regex = /^.*\/([^\/]*)/
				var filename = regex.exec(uri)[1];

				console.log(uri);

				request(uri).pipe(fs.createWriteStream('images/' + filename)).on('close', function() {
					console.log('done for ' + filename);
				});
			});
		}
	});
});

