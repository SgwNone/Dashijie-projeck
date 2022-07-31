(function () {
    $('#btn-out').click(function () {
        layer.confirm('是否退出', { icon: 3, title: '提示' }, function (index) {
            //清除本地内存中的token
            localStorage.removeItem('token')
            location.href = './login.html'
            layer.close(index);
        });
    })
}())
$.ajax({
    url: '/my/userinfo',
    method: 'GET',
    // headers: {
    //     Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
        if (res.status !== 0) {
            return layui.layer.msg('获取用户信息失败')
        }
        renderAvatar(res.data)
    },
    // complete: function (res) {
    //     console.log(res);
    //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //         localStorage.removeItem('token')
    //         location.href = '/login.html'
    //     }
    // }
})

function renderAvatar(user) {
    //设置文本文字
    let name = user.nickname || user.username
    $('#welcome').html('你好，&nbsp;' + name)
    $('#user-name').html(name)
    //判断用户头像
    if (user.user_pic !== null) {
        //适用自定义头像
        $('.avatar-auto').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        //使用默认头像
        $('.layui-nav-img').hide()
        $('.avatar-use').hide()
        let text = name[0].toUpperCase()
        $('.avatar-auto').html(text).show()
    }
}