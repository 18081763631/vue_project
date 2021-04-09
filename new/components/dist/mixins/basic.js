
module.exports = {
  data() {
    return {};
  },

  props: {},
  methods: {
    emitFun(...args) {
      this.emitFun(...args);
    },

    set(data, callback) {
      this.setData(data, callback);
      return new Promise(resolve => uni.nextTick(resolve));
    },

    getRect(selector, all) {
      return new Promise(resolve => {
        uni.createSelectorQuery().in(this)[all ? 'selectAll' : 'select'](selector).boundingClientRect(rect => {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }

          if (!all && rect) {
            resolve(rect);
          }
        }).exec();
      });
    }

  }
};