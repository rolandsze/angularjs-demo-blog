/**
 * Route helper
 */
myApp.factory('routeHelper', function($routeParams) {
    return {
        getRouteParameters: function() {
            return {
                currentPage: (!$routeParams.page) ? 1 : parseInt($routeParams.page),
                filterType: (!$routeParams.filterType) ? false : $routeParams.filterType,
                filter: (!$routeParams.filter) ? false : $routeParams.filter,
                pageId: (!$routeParams.pageId) ? false : $routeParams.pageId
            };
        }
    };
});

/**
 * Pagination helper
 */
myApp.factory('paginationHelper', function(appConfig, routeHelper, postModel) {
    return {
        getCurrentPage: function() {
            return routeHelper.getRouteParameters().currentPage;
        },

        getNumberOfPages: function() {
            route = routeHelper.getRouteParameters();

            return postModel.getPosts(false, route.filterType, route.filter).then(function(data) {
                return Math.ceil(from(data).count()/appConfig.postsPerPage);
            });
        },

        generateUrl: function(pageNumber) {
            route = routeHelper.getRouteParameters();
            generatedUrl = '#/blog/';

            if(route.filterType) {
                generatedUrl += 'filter/'+route.filterType+'/'+route.filter+'/';
            }

            if(route.currentPage !== false) {
                generatedUrl += 'page/'+pageNumber;
            }

            return generatedUrl;
        }        
    };
});

/**
 * Json helper
 */
myApp.factory('jsonHelper', function($http) {
    var loadedJsonFiles = new Array();

    return {
        loadFile: function(cacheId, path) {
            if (!loadedJsonFiles[cacheId]) {
                loadedJsonFiles[cacheId] = $http.get(path, {cache: true}).then(function (response) {
                    return response.data;
                });
            }

            return loadedJsonFiles[cacheId];
        }
    };
});

/**
 * Post model
 */
myApp.factory('postModel', function($http, appConfig, jsonHelper) {
    return {
        getPosts: function(page, filterType, filter) {
            return jsonHelper.loadFile('posts', appConfig.path.postsJson).then(function(data) {
                //Filter
                if(filterType) {
                    data = from(data)
                        .where(function(item){
                            if(filterType == "tag") {
                                return item.tags.indexOf(filter) !== -1
                            } else if(filterType == "date") {
                                return item.date.indexOf(filter) !== -1
                            }
                        });
                    }

                //Pagination
                if(page !== false) {
                    data = from(data)
                        .skip((page-1)*appConfig.postsPerPage)
                        .take(appConfig.postsPerPage);
                }

                return from(data).toArray();
            });
        },

        getPostByDateAndPermalink: function(postDate, postPermalink) {
            return jsonHelper.loadFile('posts', appConfig.path.postsJson).then(function(data) {
                return from(data)
                    .where(function(item){ return item.date == postDate && item.permalink == postPermalink; })
                    .toArray()[0];
            });
        }
    };
});

/**
 * Page helper
 */
myApp.factory('pageHelper', function($http, appConfig, jsonHelper) {
    return {
        isLinked: function(pageId) {
            return jsonHelper.loadFile('pages', appConfig.path.pagesJson).then(function(data) {
                if(pageId in data) {
                    return data[pageId];
                } else {
                    return false;
                }
            });
        }
    };
});

/**
 * Title Helper
 */
myApp.factory('titleHelper', function(){
    var title = '';

    return {
        getTitle: function() {
            return title;
        },

        setTitle: function(newTitle) {
            title = newTitle;
        }
    };
});