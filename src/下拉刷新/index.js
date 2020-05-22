const container = document.querySelector('.refresh-container');
const refresh = document.querySelector('.refresh');

container.addEventListener('scroll', (e) => {
  console.log('距离顶部高度', container.scrollTop);
  console.log('滚动条高度', container.scrollHeight);
  console.log('内容高度', container.offsetHeight);
});

let startMoveY = null;
let endMoveY = 0;
let isRefresh = false;

container.addEventListener('touchstart', (e) => {
  isRefresh = true;
  if (getScrollTop(document.querySelector('.content'))) {
    return;
  }
  startMoveY = e.touches[0].clientY;
});

container.addEventListener('touchmove', (e) => {
  if (getScrollTop(document.querySelector('.content'))) {
    startMoveY = startMoveY || e.touches[0].clientY;
    return;
  }
  if(!isRefresh) {
    return;
  }
  endMoveY = e.touches[0].clientY;
  const distance = endMoveY - startMoveY;
  console.log(startMoveY, endMoveY, distance);
  let offsetY = distance - 100;
  if (offsetY > 0) {
    offsetY = 0;
  }
  if (offsetY < -100) {
    offsetY = -100;
  }
  container.style = `
    top:${offsetY}px;
  `;
  if(offsetY > -20) {
    refresh.innerHTML= '松开刷新';
  } else {
    refresh.innerHTML= '下拉刷新';
  }
});
container.addEventListener('touchend', (e) => {
  isRefresh = false;
  const distance = endMoveY - startMoveY;
  const offsetY = distance - 100 > 0 ? 0 : distance - 100 < -100 ? -100 : distance - 100;
  if (offsetY > -20) {
    setTimeout(() => {
      container.style = `
        top: ${-100}px;
        transition: 1s;
      `;
    }, 3000);
  } else {
    container.style = `
      top: ${-100}px;
      transition: 1s;
    `;
  }

});
const getScrollTop = function(el) {
  return el.scrollTop;
};