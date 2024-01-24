function JJY(g) {
    function h(b) {
        return b % 10 + (b / 10 % 10 << 4) + (b / 100 << 8)
    }

    function k(b) {
        for (var c = 0; b;) c ^= b & 1, b >>>= 1;
        return c
    }

    function n(b) {
        b = b || new Date(Date.now() + 324E5);
        var c = h(b.getUTCMinutes()),
            d = h(b.getUTCHours()),
            e = h(Math.floor((b - new Date(b.getUTCFullYear(), 0, 0, 0, 0)) / 864E5)),
            f = h(b.getUTCFullYear() % 100),
            g = b.getUTCDay(),
            a = m.slice();
        a[1] = c >> 6 & 1;
        a[2] = c >> 5 & 1;
        a[3] = c >> 4 & 1;
        a[5] = c >> 3 & 1;
        a[6] = c >> 2 & 1;
        a[7] = c >> 1 & 1;
        a[8] = c & 1;
        a[12] = d >> 5 & 1;
        a[13] = d >> 4 & 1;
        a[15] = d >> 3 & 1;
        a[16] = d >> 2 & 1;
        a[17] = d >> 1 & 1;
        a[18] = d & 1;
        a[22] = e >> 9 & 1;
        a[23] = e >> 8 & 1;
        a[25] = e >> 7 & 1;
        a[26] = e >> 6 & 1;
        a[27] = e >> 5 & 1;
        a[28] = e >> 4 & 1;
        a[30] = e >> 3 & 1;
        a[31] = e >> 2 & 1;
        a[32] = e >> 1 & 1;
        a[33] = e & 1;
        a[36] = k(d);
        a[37] = k(c);
        a[41] = f >> 7 & 1;
        a[42] = f >> 6 & 1;
        a[43] = f >> 5 & 1;
        a[44] = f >> 4 & 1;
        a[45] = f >> 3 & 1;
        a[46] = f >> 2 & 1;
        a[47] = f >> 1 & 1;
        a[48] = f & 1;
        a[50] = g >> 2;
        a[51] = g >> 1 & 1;
        a[52] = g & 1;
        return {
            bitCode: a,
            cs: b.getUTCSeconds()
        }
    }
    g = parseFloat(g);
    var m = "200000000200000000020000000002000000000200000000020000000002".split("").map(Number);
    return {
        getTimeCode: n,
        run: function(b) {
            var c = new(window.AudioContext || window.webkitAudioContext),
                d = c.sampleRate,
                e = 4E4 / 3 / d,
                f = [],
                h = [.8, .5, .2];
            if (isNaN(g) || 2 > g) g = d / 3;
            c.createBuffer = c.createBuffer || c.webkitCreateBuffer;
            c.createBufferSource = c.createBufferSource || c.webkitCreateBufferSource;
            performance.now = performance.now || performance.webkitNow || function() {
                return (new Date).getTime()
            };
            secondTick = function(a) {
                var c = 0,
                    b = 0,
                    d = 0;
                return function(e) {
                    c = performance.now();
                    setTimeout(function() {
                        d = (b = performance.now()) - c - a;
                        c = b;
                        e()
                    }, a - d / 2)
                }
            }(1E3);
            for (var a = 0; 3 > a; a++) {
                var k = d * h[a];
                f[a] = c.createBuffer(1, k, d);
                for (var m = f[a].getChannelData(0), l = 0; l < k; l++) m[l] = Math.floor(g * Math.sin(2 * Math.PI * l * e)) / g
            }
            var p = function() {
                var a = n(b),
                    d = a.cs,
                    e = function() {
                        secondTick(59 > d ? e : p);
                        var b = c.createBufferSource();
                        b.buffer = f[a.bitCode[d]];
                        b.connect(c.destination);
                        b.start();
                        d++
                    };
                e()
            };
            p()
        }
    }
}
"undefined" !== typeof module && module.exports && this.module !== module ? module.exports = JJY() : window.addEventListener("click", Z = function() {
    JJY(location.hash.slice(1)).run();
    console.log("JJY transmission started");
    window.addEventListener("hashchange", function() {
        location.reload()
    });
    window.removeEventListener("click", Z);
    window.removeEventListener("keydown", Z)
});
window.addEventListener("keydown", Z)