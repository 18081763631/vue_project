function getCurrentPage() {
  const pages = getCurrentPages();
  return pages[pages.length - 1] || {};
}
function onPageScroll(event) {
  const {
    vanPageScroller = []
  } = getCurrentPage();
  vanPageScroller.forEach(scroller => {
    if (typeof scroller === 'function') {
      scroller(event);
    }
  });
}

module.exports = {
  data() {
    return {};
  },

  props: {},

  beforeMount() {
    const page = getCurrentPage();

    if (Array.isArray(page.vanPageScroller)) {
      page.vanPageScroller.push(scroller.bind(this));
    } else {
      page.vanPageScroller = typeof page.onPageScroll === 'function' ? [page.onPageScroll.bind(page), scroller.bind(this)] : [scroller.bind(this)];
    }

    page.onPageScroll = onPageScroll;
  },

  destroyed() {
    const page = getCurrentPage();
    page.vanPageScroller = (page.vanPageScroller || []).filter(item => item !== scroller);
  },

  methods: {}
};