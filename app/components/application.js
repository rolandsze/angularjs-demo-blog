/**
 * Application with dependencies
 */
var myApp = angular.module('myApp', [
        'ngRoute',
        'ngSanitize',
        'hljs'
    ]);

/**
 * Configuration
 */
myApp.value('appConfig', {
    path: {
        views:'app/views',
        postsJson: 'app/data/posts.json',
        pagesJson: 'app/data/pages.json',
        tagsJson: 'app/data/tags.json',
        extendedPosts: 'app/data/posts',
        pages: 'app/data/pages',
        images: 'public/images'
    },
    postsPerPage: 3,
    dateFormat: 'MMMM dd, yyyy'
});

myApp.constant('pathToViews', 'app/views');

/**
 * Routes
 */
myApp.config(['$routeProvider', 'pathToViews',
    function($routeProvider, pathToViews) {
        $routeProvider
        .when('/blog', {
            templateUrl: pathToViews + '/postList.html',
            controller: 'blogPostList'
        })
        .when('/blog/post/:postDate/:postPermalink', {
            templateUrl: pathToViews + '/postRead.html',
            controller: 'blogPostRead'
        })
        .when('/blog/filter/:filterType/:filter', {
            templateUrl: pathToViews + '/postList.html',
            controller: 'blogPostList'
        })
        .when('/blog/page/:page', {
            templateUrl: pathToViews + '/postList.html',
            controller: 'blogPostList'
        })
        .when('/blog/filter/:filterType/:filter/page/:page', {
            templateUrl: pathToViews + '/postList.html',
            controller: 'blogPostList'
        })
        .when('/page/:pageId', {
            templateUrl: pathToViews + '/pageRead.html',
            controller: 'pageRead'
        })
        .otherwise({ redirectTo: '/blog' });
}]);
