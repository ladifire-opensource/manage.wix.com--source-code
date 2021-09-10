// The following snippet has been modified from:
// https://github.com/JedWatson/react-select/blob/f0602728bfad498cf34b528a02923135b17c774d/src/utils.js#L188
export default function scrollIntoView(parentElement, focusedElement) {
  var parentRect = parentElement.getBoundingClientRect();
  var focusedRect = focusedElement.getBoundingClientRect(); // We'll change the `scrollTop` only when needed. For example, when the
  // focused element is already in the view, we won't change it.

  if (focusedRect.bottom > parentRect.bottom) {
    // The hovered element is *below* the view
    parentElement.scrollTop = Math.min(focusedElement.offsetTop + focusedElement.clientHeight - parentElement.offsetHeight, parentElement.scrollHeight);
  } else if (focusedRect.top < parentRect.top) {
    // The hovered element is *above* the view
    parentElement.scrollTop = Math.max(focusedElement.offsetTop, 0);
  }
}