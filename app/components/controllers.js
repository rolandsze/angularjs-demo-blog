/**
 * Blog
 *
 * Post list controller
 */
myApp.controller('blogPostList', function($scope, appConfig, routeHelper, postModel, titleHelper) {
    route = routeHelper.getRouteParameters();
    pageTitle = 'Blog';

    postModel.getPosts(route.currentPage, route.filterType, route.filter).then(function(posts) {
        $scope.posts = posts;
    });

    $scope.dateFormat = appConfig.dateFormat;
    $scope.pathToImages = appConfig.path.images;
    $scope.pathToPaginationView = appConfig.path.views+'/pagination.html';

    if(route.filterType) {
        if(route.filterType == 'tag') {
            pageTitle += ' » "' + route.filter + '"';
        } else {
            pageTitle += ' » "' + route.filter + '"';
        }
    }

    titleHelper.setTitle(pageTitle);
});

/**
 * Blog
 *
 * Post read controller
 */
myApp.controller('blogPostRead', function($scope, $routeParams, appConfig, postModel, titleHelper) {
    postModel.getPostByDateAndPermalink($routeParams.postDate, $routeParams.postPermalink).then(function(post) {
        $scope.post = post;
        $scope.pathToExtendedPost = appConfig.path.extendedPosts+'/'+post.date+'-'+post.permalink+'.html';
        titleHelper.setTitle('Blog » '+post.title);
    });

    $scope.dateFormat = appConfig.dateFormat;
    $scope.pathToImages = appConfig.path.images;
});

/**
 * Blog
 *
 * Pagination controller
 */
myApp.controller('blogPagination', function($scope, paginationHelper) {
    currentPage = paginationHelper.getCurrentPage();

    paginationHelper.getNumberOfPages().then(function(countedPages) {
        $scope.numberOfPages = countedPages;
    });

    $scope.currentPage = currentPage;
    $scope.urlForNextPage = paginationHelper.generateUrl(currentPage+1);
    $scope.urlForPreviousPage = paginationHelper.generateUrl(currentPage-1);
});

/**
 * Pages
 *
 * Page read controller
 */
myApp.controller('pageRead', function($scope, appConfig, routeHelper, pageHelper, jsonHelper, titleHelper) {
    pageId = routeHelper.getRouteParameters().pageId;

    pageHelper.isLinked(pageId).then(function(pageTitle) {
        if(pageTitle !== false) {
            pathToPage = appConfig.path.pages+'/'+pageId+'.html';
            titleHelper.setTitle(pageTitle);
        } else {
            pathToPage = appConfig.path.views+'/404.html';
            titleHelper.setTitle('404');
        }

        $scope.pathToPage = pathToPage;
    });
});

/**
 * Main menu controller
 */
myApp.controller('mainMenu', function($scope, $location, appConfig) {
    $scope.pathToMenuView = appConfig.path.views+'/mainMenu.html';

    $scope.isActive = function (route) {
        return $location.path().indexOf(route) == 0;
    };
});

/**
 * Title controller
 */
myApp.controller('titleController', function($scope, titleHelper) {
    $scope.titleHelper = titleHelper;
});