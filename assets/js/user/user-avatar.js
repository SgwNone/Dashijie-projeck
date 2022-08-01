$(function () {
    let layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //设置点击上传按钮实现文件上传
    $('#avatar-sub').click(function () {
        $('#avatar-file').click()
    })

    //替换预览框中的图片
    $('#avatar-file').on('change', function (e) {
        let fileList = e.target.files
        if (fileList.length === 0) {
            return layer.msg('请选择文件')
        }
        let file = e.target.files[0]
        let newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    //上传选用的图片作为头像
    $('#avatar-upload').on('click', function () {
        let dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')    // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            url: '/my/update/avatar',
            method: 'POST',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('上传文件失败')
                }
                layer.msg('上传文件成功')
                window.parent.getUserdata()
            }
        })
    })
})