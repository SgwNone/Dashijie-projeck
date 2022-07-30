
$('#link-login').on('click', () => {
    $('.login-box').hide()
    $('.reg-box').show()
    $('.layui-form-item').css('margin', '10px 20px')
})

$('#link-reg').on('click', () => {
    $('.reg-box').hide()
    $('.login-box').show()
    $('.layui-form-item').css('margin', '20px 20px')
})

//添加自定义的表单验证规则
let form = layui.form
let layer = layui.layer

form.verify({
    //自定义密码规则
    psw: [/^[\S]{6,12}$/
        , '密码必须6到12位,且不能出现空格'],

    //自定义注册确认密码规则
    repsw: function (value) {
        let psw = $('.reg-box [name=password]').val()
        if (psw !== value) {
            return '俩次输入密码不一致'
        }
    }

})

$('#reg-form').on('submit', function (e) {
    e.preventDefault()
    $.post('/api/reguser', { username: $('#reg-form [name=username]').val(), password: $('#reg-form [name=password]').val() }, (res) => {
        if (res.status !== 0) {
            console.log(res.message);
            return layer.msg(res.message);
        }
        layer.msg('注册成功，请登录');
        console.log('注册成功，请登录');
        $('#link-reg').click()
    })
})

$('#login-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
        url: '/api/login',
        method: 'POST',
        data: $(this).serialize(),
        success: function (res) {
            console.log(res)
            if (res.status !== 0) {
                return layer.msg('登陆失败')
            }
            localStorage.setItem('token', res.token)
            location.href = '/index.html'
        }
    })
})

