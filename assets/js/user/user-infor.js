(function () {
    let form = layui.form
    let layer = layui.layer
    //设置表单验证
    form.verify({
        nickname: function (value) {
            console.log(value.length);
            if (value.length > 6) {
                return '昵称长度必须在1-6位之间'
            }
        }
    })
    setUserinfor()
    //获取用户信息
    function setUserinfor() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                form.val('formuserinfo', res.data)
            }
        })
    }

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('提交更新失败')
                }
                window.parent.getUserdata()
            }
        })
    })

    $('#btn-reset').click(function (e) {
        e.preventDefault()
        setUserinfor()
    })
}())