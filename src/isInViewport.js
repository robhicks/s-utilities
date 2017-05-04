export default function isInViewport(element) {
  let rect = element.getBoundingClientRect();
  // console.log("rect", rect)
  let html = document.documentElement;
  return (
    rect.top >= 0 - rect.height &&
    rect.left >= 0 - rect.width &&
    rect.bottom <= html.clientHeight + rect.height &&
    rect.right <= html.clientWidth
  );
}
