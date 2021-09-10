import { ISectionVisibleResults } from '../../../services/bi/send-bi-events';

export function getSectionVisibleOptionsCount(searchBoxContainer: HTMLDivElement): ISectionVisibleResults {

  const container = searchBoxContainer.querySelector('[data-hook="dropdown-layout-options"]');
  const elements = searchBoxContainer.querySelectorAll('[data-hook="search-everything-option"]');
  const partial = false;

  const isElementVisible = element => {

    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;

    const elementTop = element.offsetTop;
    const elementBottom = elementTop + element.clientHeight;

    const isTotal = (elementTop >= containerTop && elementBottom <= containerBottom);
    const isPartial = partial && (
      (elementTop < containerTop && elementBottom > containerTop) ||
      (elementBottom > containerBottom && elementTop < containerBottom)
    );

    return  (isTotal  || isPartial);
  };

  const isElementATitle = (el: Element) => el.getAttribute('data-index-in-section') === '-1';

  const seenElements = {};
  elements.forEach(el => {
    if (isElementVisible(el)) {
      const dataType = el.getAttribute('data-type');

      if (!isElementATitle(el)) {
        seenElements[dataType] = (seenElements[dataType] || 0) + 1;
      }
    }
  });

  return seenElements;
}
