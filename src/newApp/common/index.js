


// 回到顶部
export const Scroll = {
    x: _ => document.documentElement.scrollTop || document.body.scrollTop,          /*滚动条的位置*/
    h: _ => document.documentElement.clientHeight || document.body.clientHeight,    /*滚动条长度*/
    H: _ => document.documentElement.scrollHeight || document.body.scrollHeight,    /*滚屏长度*/
    goTop: _ => {
        let stop = 0;

        window.requestAnimationFrame = (cb) => {
            setTimeout(cb, 1000 / 60); // 60 PFS
        }

        const render = () => {
            const x = Scroll.x();
            const H = Scroll.H();
            if (x <= 5) {
                stop = 1;
            };

            // 设置最少限制值
            const move = x - Math.max(x / (H * 0.05), 80);
            window.scroll(0, move);
        }

        (function animloop() {
            !stop && requestAnimationFrame(animloop);
            render();
        })();
    },
};
