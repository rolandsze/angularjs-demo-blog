/**
 * ScrollTo directive
 */
myApp.directive('scrollTo', ['$location', '$anchorScroll', function ($location, $anchorScroll) {
    return function(scope, element, attrs) {
        element.bind('click', function(event) {
            var location = attrs.scrollTo;
            $location.hash(location);
            $anchorScroll();
        });
    };
}]);

/**
 * Emoticon directive
 */
myApp.directive('emoticon', function () {
    return {
        restrict: 'E',
        replace: true,
        link: function(scope, element, attrs) {
            element.html('<i class="emoticon-'+element.text()+'"></i>');
        }
    };
});

/**
 * Tag directive
 */
myApp.directive('tag', ['appConfig', 'jsonHelper', function (appConfig, jsonHelper) {
    var loadedTags = jsonHelper.loadFile('tags', appConfig.path.tagsJson);

    return {
        restrict: 'E',
        replace: true,
        link: function (scope, element, attrs) {
            loadedTags.then(function(tags) {
                if(tags[scope.tag]) {
                    element.replaceWith(tags[scope.tag]);
                }
            });
        }
    };
}]);