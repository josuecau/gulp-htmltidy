'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var tidy = require('htmltidy').tidy;

module.exports = function(opt){
    return through.obj(function (file, enc, cb) {
        if (!opt) {
            opt = {};
        }

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-htmltidy', 'Streaming not supported'));
            return cb();
        }

        tidy(file.contents, opt, function (err, html) {
            if (err) {
                this.emit('error', new gutil.PluginError('gulp-htmltidy', err));
            }

            file.contents = new Buffer(String(html));

            this.push(file);

            return cb();
        }.bind(this));
    });
};