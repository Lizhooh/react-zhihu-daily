
/**
 * 公共的工具函数
 */

export const Scroll = {
    x: (who = document) => {  /*滚动条的位置*/
        if (who !== document) return who.scrollTop;
        return who.documentElement.scrollTop || who.body.scrollTop;
    },
    h: (who = document) => {  /*滚动条长度*/
        if (who !== document) return who.clientHeight;
        return who.documentElement.clientHeight || who.body.clientHeight;
    },
    H: (who = document) => {  /*滚屏长度*/
        if (who !== document) return who.scrollHeight;
        return who.documentElement.scrollHeight || who.body.scrollHeight;
    },

    // 回到顶部
    goTop: (who = document) => {
        let stop = 0;

        window.requestAnimationFrame = (cb) => {
            setTimeout(cb, 1000 / 60); // 60 PFS
        }

        const render = () => {
            const x = Scroll.x(who);
            const H = Scroll.H(who);
            if (x <= 5) stop = 1;

            // 设置最少限制值
            const move = x - Math.max(x / (H * 0.05), 80);
            window.scroll(0, move);
        }

        (function animloop() {
            !stop && window.requestAnimationFrame(animloop);
            render();
        })();
    },
};
