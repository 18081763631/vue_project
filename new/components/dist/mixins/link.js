
module.exports = {
  data() {
    return {};
  },

  props: {
    url: String,
    linkType: {
      type: String,
      default: 'navigateTo'
    }
  },
  methods: {
    jumpLink(urlKey = 'url') {
      const url = this[urlKey];

      if (url) {
        uni[this.linkType]({
          url
        });
      }
    }

  }
};