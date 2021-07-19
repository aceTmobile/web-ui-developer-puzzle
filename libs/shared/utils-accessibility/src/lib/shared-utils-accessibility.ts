export enum SelectorType {
  class,
  id
}

export interface SelectorQuery {
  selector: string;
  type: SelectorType;
  ariaLabelValue: string;
}

export function setAriaLabel(selectorQuery: SelectorQuery) {
  let element;
  switch (selectorQuery.type) {
    case SelectorType.id:
      element = document.querySelector('#'+selectorQuery.selector);
      break;
    case SelectorType.class:
      element = document.querySelector('.'+selectorQuery.selector);
      break;
  }
  if (element != null) {
    element.setAttribute('aria-label', selectorQuery.ariaLabelValue);
  }
};