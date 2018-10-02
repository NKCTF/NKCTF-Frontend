function getPopupStr(w, h) {
  const dualScreenLeft = window.screenLeft  ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop ? window.screenTop : window.screenY;

  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  const left = ((width / 2) - (w / 2)) + dualScreenLeft;
  const top = ((height / 2) - (h / 2)) + dualScreenTop;
  return 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left;
}

module.exports = {
  getPopupStr
};
