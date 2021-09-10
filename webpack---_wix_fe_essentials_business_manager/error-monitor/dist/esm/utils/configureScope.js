import { addTags } from './addTags';
export function configureScope(sentryInstance, options) {
    var user = options.user, appName = options.appName, tags = options.tags;
    sentryInstance.configureScope(function (scope) {
        if (user) {
            scope.setUser(user);
        }
        if (tags) {
            addTags(scope, appName, tags);
        }
    });
}
//# sourceMappingURL=configureScope.js.map