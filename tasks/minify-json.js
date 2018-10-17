'use strict';
var through 		= require('through2'),
	jsonminify 		= require('gulp-jsonminify'),
  	gutil 			= require('gulp-util'),
  	jsBeautify 		= require('js-beautify').js_beautify,
  	toSingleQuotes 	= require('to-single-quotes-shahata'),
  	_ 				= require('lodash');
  	
function unflatten(json) {
  return Object.keys(json).reduce(function (prev, key) {
    return _.merge(prev, key.split('.').reduceRight(function (prev, curr) {
      var obj = {};
      obj[curr] = prev;
      return obj;
    }, json[key]));
  }, {});
}

module.exports = function jsonAngularTranslate(options) {
  	var extractLanguage, contentProcessor;

  	options = _.extend({
		moduleName: 'translations',
    	extractLanguage: /..(?=\.[^.]*$)/,
    	hasPreferredLanguage: true,
    	createNestedKeys: true
  	}, options);

	extractLanguage = typeof(options.extractLanguage) === 'function' ? options.extractLanguage : function (filepath) {
		return filepath.match(options.extractLanguage)[0];
  	};

  	contentProcessor = options.createNestedKeys ? unflatten : _.identity;

  	return through.obj(function doJsonAngularTranslate(file, enc, callback) {
    	if (file.isStream()) {
      		this.emit('error', new gutil.PluginError('gulp-json-angular-translate', 'Streaming not supported!'));
      		return callback();
		}

    	if (file.isBuffer()) {
    		var text 			= '$translateProvider.translations(\'<%= language %>\', <%= translations %>);\n';
    		var translations	= toSingleQuotes(JSON.stringify(contentProcessor(JSON.minify(file.contents.toString()))));
    		//translations		= translations.substring(1, translations.length-1);
    		//translations		= JSON.stringify(JSON.parse(file.contents.toString()));
    		//console.log("test my js: ",JSON.minify(file.contents.toString()));
    		//translations		= translations.replace("'{","{").replace("}'","}");
      		var result 			= gutil.template(
	      			text ,
	      			_.extend({}, options, {
		        		language: 		extractLanguage(file.path),
		        		translations: 	translations,
		        		file: 			file
					})
				);
				
      		result 			= jsBeautify(result, {'indent_size': 2, 'jslint_happy': false});
      		file.contents 	= new Buffer(result);
      		file.path 		= gutil.replaceExtension(file.path, '.js');
      
      		this.push(file);
      		callback();
    	}
  });
};