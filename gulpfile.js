
/*
* gulp工作流
* 1.Less编译 压缩 合并
* 2.JS合并 压缩 混淆
* 3.img复制
* 4.html压缩
* */

/*导包*/
//在gulpfile中先载入gulp包，因为这个包提供了一些api
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var htmlmin = require('gulp-htmlmin')

//1.Less编译 压缩 （合并没有必要，因为一般预处理css都可以导包）

gulp.task('style', function () {

  gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
    .pipe(less())
    .pipe(cssnano())
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.reload({
      stream: true
    }))
})


//2.JS合并 压缩 混淆
gulp.task('js', function () {

  gulp.src('src/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({        //浏览器刷新
      stream: true
    }))
})


//3.图片复制
gulp.task('image', function () {

  gulp.src('src/images/*.*')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({        //浏览器刷新
      stream: true
    }))


})

//4.html
gulp.task('html', function () {

  gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true, //去掉空格
      removeComments: true      //去掉注释
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({        //浏览器刷新
      stream: true
    }))

})



//5.浏览器自动刷新和监听 自动同步
gulp.task('serve', function () {
  
  browserSync({
    server: {
      baseDir: ['dist']
    },
    
  }, function (err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
  });

  gulp.watch('src/styles/*.less',['style']);
  gulp.watch('src/scripts/*.js',['js']);
  gulp.watch('src/images/*.*',['image']);
  gulp.watch('src/*.html',['html']);
  
})

