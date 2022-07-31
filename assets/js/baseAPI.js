$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url

    //为所有要权限的请求统一添加header
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }
    }
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})