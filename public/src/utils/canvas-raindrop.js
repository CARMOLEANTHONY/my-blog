/*
* 2018/03/26
* canvas绘制雨滴
* */
export default function () {
    var rains = [],
        cas = document.querySelector('#cas'),
        ctx = cas.getContext('2d'),
        _W = window.innerWidth,
        _H = window.innerHeight

    setCanvasLayout()

    window.addEventListener('resize', setCanvasLayout)

    function setCanvasLayout() {
        _W = window.innerWidth
        _H = window.innerHeight

        cas.width = _W
        cas.height = _H
    }

    function initPage() {
        var count = 0.5 * _W,
            i = 0

        for (; i < count; i++) {
            rains.push(new rainDrop())
            if (i < count * 0.05) {
                rains.push(new rainDrop(true))
            }
        }
        render()
    }

    function render() {

        ctx.clearRect(0, 0, _W, _H)

        rains.forEach(v => {v.move()})
        window.requestAnimationFrame(render)
    }

    function rainDrop(flag) {
        this.flag = flag
        this.step = 0.01
        this.init = function (first) {
            this.width = this.flag ? Math.floor(Math.random() * 3 + 5) : [0.6, 0.8, 1, 1.2, 1.4][Math.floor(Math.random() * 5)]
            this.height = Math.ceil(Math.random() * 5 + 5)
            this.opacity = (Math.random() * 0.2 + 0.01).toFixed(2)
            this.x = Math.random() * _W
            this.y = first ? Math.random() * _H : -this.height
            this.gravity = this.flag ? 0 : Math.random() * 0.1
            this.color = this.randomColor(true)
            this.v = this.flag ? [0.05, 0.1, 0.15, 0.2, 0.25][Math.floor(Math.random() * 5)] : 0
        }

        this.move = function () {
            if (this.y > _H) {
                this.init()
            }

            if (this.flag) {
                if (this.width > 8) {
                    this.step = -0.01
                } else if (this.width < 5) {
                    this.step = 0.01
                }
                this.width += this.step
                this.height -= this.step
            }

            this.v += this.gravity
            this.y += this.v
            this.draw()
        }

        this.draw = function () {
            var ratioX
            ctx.save()
            ratioX = this.width / this.height
            ctx.scale(ratioX, 1)
            ctx.beginPath()
            ctx.fillStyle = this.color
            ctx.moveTo((this.x + this.width) / ratioX, this.y)
            ctx.arc(this.x / ratioX, this.y, this.height, 0, 2 * Math.PI)
            ctx.fill()
            ctx.closePath()
            ctx.restore()
        }

        this.randomColor = function (isWhite) {
            var colorStr = 'rgba(',
                randomNum = 0
            for (var i = 0; i < 3; i++) {
                randomNum = Math.floor(Math.random() * 256)
                colorStr += randomNum
                colorStr += ', '
            }
            colorStr += this.opacity
            colorStr += ')'

            return isWhite ? 'rgba(255, 255, 255, ' + this.opacity + ')' : colorStr
        }

        this.init(true)
    }

    rainDrop.prototype = {
        constructor: rainDrop,

        // 十六进制颜色转换为rgb
        toRgb: function () {
            var colorStr = '',
                colorArr = []
            if (this.color.length == 4) {
                for (var i = 1; i < 4; i++) {
                    colorArr.push(this.color.slice(i, i + 1).concat(this.color.slice(i, i + 1)))
                }
            } else if (this.color.length == 7) {
                for (var i = 1; i < 7; i += 2) {
                    colorArr.push(this.color.slice(i, i + 2).concat(this.color.slice(i, i + 2)))
                }
            }

            colorArr.forEach(function (v) {
                colorStr += parseInt('0x' + v)
                colorStr += ', '
            })

            this.color = colorStr.substring(0, colorStr.length - 2)
        }
    }

    return initPage
}