


// 回到顶部
export const Scroll = {
    x: (_ = document) => {  /*滚动条的位置*/
        if (_ !== document) return _.scrollTop;
        return _.documentElement.scrollTop || _.body.scrollTop;
    },
    h: (_ = document) => { /*滚动条长度*/
        if (_ !== document) return _.clientHeight;
        return _.documentElement.clientHeight || _.body.clientHeight;
    },
    H: (_ = document) => {  /*滚屏长度*/
        if (_ !== document) return _.scrollHeight;
        return _.documentElement.scrollHeight || _.body.scrollHeight;
    },
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
