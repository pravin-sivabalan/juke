var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var tsProject = ts.createProject('tsconfig.json');
var spawn = require('child_process').spawn, node;

gulp.task('clean', function(){
  return gulp.src('release', {read: false})
    .pipe(clean());
});

gulp.task('build', ['clean'], function () {
  return gulp.src('./server/configs/*.json')
    .pipe(gulp.dest('./release/configs'));
});

gulp.task('compile', ['build'], function() {
    var tsResult = gulp.src([
        "./server/**/*.ts",
        "./custom-typings/**/*.d.ts",
        "./node_modules/@types/**/*.d.ts"
    ]).pipe(tsProject());

	return merge([
    tsResult.js.pipe(gulp.dest('release'))
	]);
});

gulp.task('server', ['compile'], function() {
  if (node) node.kill()
  node = spawn('node', ['release/server.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})

gulp.task('watch', ['server'], function() {
    gulp.watch('./server/**/*.ts', ['server']);
});

process.on('exit', function() {
    if (node) node.kill()
});
