import { isLink } from '@wix/business-manager-sidebar-data';
import { isSitelessExperience } from '../selectors/select-site';
export var filterBySitelessExperience = function (state) { return function (entry) {
    var shouldHide = isSitelessExperience(state) && isLink(entry) && !entry.visibleInSiteless;
    return !shouldHide;
}; };
//# sourceMappingURL=filter-by-siteless-experience.js.map