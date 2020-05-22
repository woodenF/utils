export default class DownRefresh {
  constructor({
    el,
    refreshEl,
  // eslint-disable-next-line no-undef
  } = options) {
    // 下拉刷新的容器节点
    this.el = el;
    // 下拉刷新的展示节点
    this.refreshEl = refreshEl;
    this.refreshElHeight = this.refreshEl.offsetHeight;
    // 是否可下拉展示下拉刷新组件
    this.downStatus = false;
    // 下拉刷新的开始触摸点
    this.startY = null;
    // 参与每一次计算的结束触摸点
    this.distance = null;
    this.initStyle();
    this.listener();
  }
  initStyle() {
    this.el.style.top = `-${this.refreshElHeight}px`;
  }
  listener() {
    this.el.addEventListener('touchstart', (e) => {
      if (!this.getScrollTop()) {
        this.downStatus = true;
        this.startY = e.touches[0].clientY;
      }
    });
    this.el.addEventListener('touchmove', (e) => {
      if (!this.getScrollTop() && !this.startY) {
        this.startY = e.touches[0].clientY;
        this.downStatus = true;
        this.el.style.overflowY = 'hidden';
      }
      console.log(this.el.style.top, `-${this.refreshElHeight}px`);
      if(!this.downStatus) {
        return;
      }
      const endY = e.touches[0].clientY;
      this.distance = endY - this.startY;
      this.distance = this.distance > this.refreshElHeight ?
        this.refreshElHeight :
        this.distance < 0 ?
          0 :
          this.distance;
      this.setTopStyle(-this.refreshElHeight + this.distance, 0);
    });
    this.el.addEventListener('touchend', () => {
      this.startY = null;
      this.downStatus = false;
      this.setTopStyle(-this.refreshElHeight, .5);
      this.el.style.overflowY = 'auto';
    });
  }
  setTopStyle(top = -this.refreshElHeight, duration = .5) {
    console.log(top);
    this.el.style.top = `${top}px`;
    this.el.style.transition = `${duration}s linear`;
  }
  /**
   * 阻止浏览器的默认事件
   * 此处用来阻止下拉刷新时的列表默认滑动
   * @param {*} e
   */
  stopSlide(e) {
    // e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
  }
  /**
   * 获得节点滚动条距离顶部距离
   * 为0则为可下拉展示下拉刷新组件
   */
  getScrollTop(){
    return this.el.scrollTop;
  }
}

