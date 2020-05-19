const container = document.querySelector('.container');
const refresh = document.querySelector('.refresh');

container.addEventListener('scroll', (e) => {
  console.log('距离顶部高度', container.scrollTop);
  console.log('滚动条高度', container.scrollHeight);
  console.log('内容高度', container.offsetHeight);
});

let startMoveY = 0;
let endMoveY = 0;
let isRefresh = false;

container.addEventListener('touchstart', (e) => {
  if (getScrollTop()) {
    return;
  }
  isRefresh = true;
  startMoveY = e.touches[0].clientY;
});

container.addEventListener('touchmove', (e) => {
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
  if(offsetY > -30) {
    refresh.innerHTML= '松开刷新';
  } else {
    refresh.innerHTML= '下拉刷新';
  }
});
container.addEventListener('touchend', (e) => {
  isRefresh = false;
  const distance = endMoveY - startMoveY;
  const offsetY = distance - 100 > 0 ? 0 : distance - 100 < -100 ? -100 : distance - 100;
  if (offsetY > -50) {
    console.log('===');
  }
  container.style = `
    top: ${-100}px;
    transition: 1s;
  `;

});
const getScrollTop = function() {
  return container.scrollTop;
};