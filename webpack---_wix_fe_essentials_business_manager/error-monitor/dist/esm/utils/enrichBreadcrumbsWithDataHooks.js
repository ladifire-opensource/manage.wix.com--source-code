/**
 * At Wix we use CSS Modules for style scoping, and by default Sentry UI is not very informative
 * (all classes are minified so only tag names could bring you some context).
 * Due to the fact that we used to have data-hooks all over our applications,
 * this method enriches 'ui.click' and 'ui.input' breadcrumbs in a way that nearest data-hook will be shown inside the Sentry UI.
 * @param breadcrumb
 * @param hint
 */
export function enrichBreadcrumbsWithDataHooks(breadcrumb, hint) {
    var category = breadcrumb.category;
    var isUiInteractionBreadcrumb = category && (category === 'ui.click' || category === 'ui.input');
    var targetElement = hint && hint.event && hint.event.target;
    if (isUiInteractionBreadcrumb && targetElement) {
        var nodeWithDataHook = targetElement.closest('[data-hook]');
        if (nodeWithDataHook) {
            var dataHook = nodeWithDataHook.getAttribute('data-hook');
            if (targetElement === nodeWithDataHook) {
                breadcrumb.message = breadcrumb.message + " [data-hook=\"" + dataHook + "\"]";
            }
            else {
                breadcrumb.message = breadcrumb.message + " parent:[data-hook=\"" + dataHook + "\"]";
            }
        }
    }
    return breadcrumb;
}
//# sourceMappingURL=enrichBreadcrumbsWithDataHooks.js.map