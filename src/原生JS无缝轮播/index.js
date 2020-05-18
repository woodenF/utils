export default class Carousel {
  constructor({
    el = '#app',
    images,
    suspendDuration = 500,
    transitionDuaration = 500,
    isSeamless = true,
    clickFn
  // eslint-disable-next-line no-undef
  } = options) {
    // 获取目标节点
    this.el = document.querySelector(el);
    this.elWidth = this.el.offsetWidth;
    this.elHeight = this.el.offsetHeight;
    // 是否需要无缝轮播
    this.isSeamless = isSeamless;
    // 需要无缝轮播则修改数组
    this.images = isSeamless ? this.modifyImages(images) : images;
    // 需要无缝轮播则初始定位为数组下标为1的元素
    this.position = isSeamless ? 1 : 0;
    // 停留时间
    this.suspendDuration = typeof suspendDuration === 'number' ? suspendDuration : 500;
    // 动画过渡时长
    this.transitionDuaration = typeof transitionDuaration === 'number' ? transitionDuaration : 500;
    // 点击事件回调
    this.clickFn = clickFn;
    // 自动轮播定时器
    this.timer = null;
    // 生成的用以动画的子节点
    this.container = null;
    // 分页器节点
    this.paginationContainer = null;
    this.appendCarouselNode();
    this.appendPagination();
    this.startPlay();
  }
  /**
     * 是否需要无缝轮播，修改数组
     */
  modifyImages(images) {
    const unshift = images[images.length - 1];
    const push = images[0];
    images.unshift(unshift);
    images.push(push);
    return images;
  }
  /**
     * 将轮播节点添加到目标节点当中
     */
  appendCarouselNode() {
    this.container = document.createElement('div');
    this.container.style = `
            width: ${this.images.length * this.elWidth}px;
            height: ${this.elHeight}px;
            font-size: 0;
            transform: translateX(${this.isSeamless ? -this.elWidth : 0}px)
        `;
    for (let i = 0; i < this.images.length; i++) {
      const img = document.createElement('img');
      img.src = this.images[i];
      // 禁用html自带的图片拖拽虚影
      img.draggable = false;
      img.style = `
                width: ${this.elWidth}px;
                height: ${this.elHeight}px;
            `;
      this.container.appendChild(img);
    }
    this.el.appendChild(this.container);
    this.listenContainer();
  }
  /**
     * 添加分页器节点
     */
  appendPagination() {
    const elPosition = window.getComputedStyle(this.el, null).position;
    this.el.style.position = elPosition !== 'static' || 'relative';
    this.paginationContainer = document.createElement('div');
    this.paginationContainer.classList.add('carousel-pagination');
    this.paginationContainer.style = `
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
    const len = this.isSeamless ? this.images.length - 2 : this.images.length;
    for (let i = 0; i < len; i++) {
      const bullet = document.createElement('span');
      bullet.classList.add('carousel-pagination-bullet');
      bullet.bulletIndex = i;
      this.paginationContainer.appendChild(bullet);
    }
    this.el.appendChild(this.paginationContainer);
    this.paginationContainer.addEventListener('click', (e) => {
      const bulletIndex = this.isSeamless ? e.target.bulletIndex + 1 : e.target.bulletIndex;
      bulletIndex && this.updatePosition(bulletIndex);
    });
  }
  /**
     * 更新当前状态节点
     */
  updateActiveBullet(position) {
    const childNodes = [...this.paginationContainer.childNodes];
    childNodes.map((item, idx) => {
      if (idx === position) {
        item.classList.add('carousel-pagination-bullet-active');
      } else {
        item.classList.remove('carousel-pagination-bullet-active');
      }
      return item;
    });
  }
  /**
     * 开始播放
     */
  startPlay() {
    if (!this.isSeamless) {
      return;
    }
    this.updateActiveBullet(this.isSeamless ? this.position - 1 : this.position);
    // 定时器调用时间等于过渡时间 + 停留时间
    const time = this.suspendDuration + this.transitionDuaration;
    this.timer = setInterval(() => {
      this.updatePosition(++this.position);
    }, time);
  }
  /**
     * 修改position
     */
  updatePosition(position) {
    this.position = position;
    this.container.style = this.getStyleByPostion(this.transitionDuaration);
    if (this.position === this.images.length - 1 || this.position === 0) {
      this.position === 0 ? this.position = this.images.length - 2 : this.position = 1;
      setTimeout(() => {
        this.container.style = this.getStyleByPostion(0);
      }, this.transitionDuaration);
    }
    const bulletIndex = this.isSeamless ? this.position - 1 : this.position;
    this.updateActiveBullet(bulletIndex);
  }
  /**
   * 停止播放
   */
  stopPlay() {
    clearInterval(this.timer);
    this.timer = null;
  }
  /**
   * 根据下标得到样式
   * offset为拖拽时需要设置的偏移量，默认为0，非拖拽时可不传
   */
  getStyleByPostion(duration, offsetX = 0) {
    return `
      width: ${this.images.length * this.elWidth}px;
      height: ${this.elHeight}px;
      font-size: 0;
      transform: translateX(-${this.position * this.elWidth + offsetX}px);
      transition: ${duration / 1000}s;
    `;
  }
  /**
     * 监听container事件
     */
  listenContainer() {
    let mouseMoveStatus = false;
    let startOffsetX = 0;
    let endOffsetX = 0;
    /**
     * 鼠标移入时停止轮播自动播放
     */
    this.el.addEventListener('mouseover', () => {
      this.stopPlay();
    });
    /**
     * 鼠标移出时重新开始播放
     */
    this.el.addEventListener('mouseout', () => {
      this.startPlay();
    });
    /**
     * 点击当前轮播的回调供外部调用
     */
    // this.container.addEventListener('click', (e) => {
    //   this.clickFn(e);
    // });

    /**
     * 鼠标按下时标记为可拖拽状态
     */
    this.container.addEventListener('mousedown', (e) => {
      // 激活可拖拽状态
      mouseMoveStatus = true;
      // 记录初始offsetX，用以判断事件类型以及拖拽结束后的状态处理
      startOffsetX = e.clientX;
    });
    /**
     * 当拖拽状态为 true 时,随鼠标拖动修改css，使展示图片改变
     */
    this.container.addEventListener('mousemove', (e) => {
      if(!mouseMoveStatus) {
        return;
      }
      // 记录移动时的offsetX，用以在拖拽时使图片跟手
      endOffsetX = e.clientX;
      // 计算移动的距离设置container的位移量
      const distance = startOffsetX - endOffsetX;
      this.container.style = this.getStyleByPostion(0, distance);
    });
    /**
     * 结束拖拽时，将节点的位置移动到合理的地方
     */
    this.container.addEventListener('mouseup', (e) => {
      // 关闭可拖拽状态
      mouseMoveStatus = false;
      endOffsetX = e.clientX;
      // 计算拖拽开始到结束的移动距离
      const distance = startOffsetX - endOffsetX;
      // 通过点击鼠标时与松开鼠标时移动的距离判断激活点击事件还是拖拽事件
      // 当鼠标未移动时调用点击方法
      if (distance === 0) {
        this.clickFn(e);
        return;
      }
      // 计算拖拽的绝对值是否达到改变position的标准
      if (Math.abs(distance) > this.elWidth / 4) {
        this.position = distance > 0 ? this.position + 1 : this.position - 1;
      }
      this.updatePosition(this.position);
    });
  }
}