var accessTokenProvider = (function() {
  var accessToken = ''

  return { // public interface
    getAccessToken: function () {
      return accessToken
    },
    setAccessToken: function (newAccessToken: string) {
      accessToken = newAccessToken
    }
  };
})();

export default accessTokenProvider
