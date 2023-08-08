export const getStylePixelValue = (element: Element, propertyName: string) =>
  parseFloat(window.getComputedStyle(element).getPropertyValue(propertyName));
