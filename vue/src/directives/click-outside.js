export const clickOutsideBeforeMountHook = (el, binding) => {
  el.clickOutsideEvent = (event) => {
    if (!(el === event.target || el.contains(event.target))) {
      binding.value();
    }
  };
  document.addEventListener('click', el.clickOutsideEvent);
};

export const clickOutsideUnmountedHook = (el) => {
  if (el.clickOutsideEvent) {
    document.removeEventListener('click', el.clickOutsideEvent);
  }
};
