const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

module.exports = {
  formatTime: formatTime
}; //网络访问

function getRecommend() {
  uni.request({
    url: 'http://106.52.75.136/v1/city',
    method: 'GET',
    header: {
      'content-Type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 200) {}
    }
  });
}

function getcity() {}

module.exports = {
  getRecommend: getRecommend,
  getcity: getcity
};