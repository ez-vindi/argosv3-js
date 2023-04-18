const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// // Tarefa para minificar o arquivo
// gulp.task('minify2', function() {
//   return gulp.src('src/argosv3.js')
//     .pipe(uglify())
//     .pipe(rename('argosv3.min.js'))
//     .pipe(gulp.dest('./dist'));
// });

// Tarefa para minificar o arquivo
gulp.task('minify', function() {
  return gulp.src('src/argosv3.js')
    .pipe(uglify())
    .pipe(rename('argosv3.min.js'))
    // .pipe(gulp.dest('./dist'));
    .pipe(gulp.dest('./'));
});

// Tarefa para assistir ao arquivo e executar a tarefa de minificação
gulp.task('watch', function() {
  gulp.watch('src/argosv3.js', gulp.series('minify'));
  // gulp.watch('src/argosv3.js', gulp.series('minify', 'minify2'));
});

gulp.task('default', gulp.series('minify', 'watch'));