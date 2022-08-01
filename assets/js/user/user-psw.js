(function () {
    //设置密码的表单验证
    let form = layui.form
    let layer = layui.layer
    form.verify({
        //密码位数
        psw: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //新旧密码不能一致
        samePsw: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能与原密码相同'
            }
        },
        rePsw: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '俩次密码输入不一致'
            }
        }
    })

    //提交修改后的密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改密码失败')
                }
                layer.msg('修改密码成功')
                //重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
}())