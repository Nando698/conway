var drawGrid = function(w, h, myCanvas) {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.canvas.width  = w;
    ctx.canvas.height = h;


    for (x=0;x<=w;x+=20) {
        for (y=0;y<=h;y+=20) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }
    }

    };


    drawGrid(1000, 800, "grid");