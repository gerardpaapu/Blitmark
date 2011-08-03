var cache, getImageData, methods;

cache = {};
 
getImageData = function (img) {
    var canvas, ctx, width, height;

    if (! cache[img.src]) {
        width = img.width;
        height = img.height;

        canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        cache[img.src] = ctx.getImageData(0, 0, width, height);
    }

    return cache[img.src];
};

methods = {
    'drawImage': {
        beforeFrame: function (canvas) {},    

        drawSprite: function (canvas, img, x, y) {
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, x, y, img.width, img.height);
        },

        afterFrame: function (canvas) {}
    },

    'drawRect': {
        beforeFrame: function (canvas) {},

        drawSprite: function (canvas, img, x, y) {
            var ctx = canvas.getContext('2d');
            ctx.drawRect(x, y, img.width, img.height);
        },

        afterFrame: function (canvas) {}
    },

    'putImageData': { 
        beforeFrame: function (canvas) {},

        drawSprite: function (canvas, img, x, y) {
            var buffer = getImageData(img),
                ctx = canvas.getContext('2d');

            ctx.putImageData(buffer, x, y);
        },

        afterFrame: function (canvas) {}
    },

    'putImageData + transparency': {
        beforeFrame: function (canvas) {},

        drawSprite: function (canvas, img, x, y) {
            var buffer = getImageData(img),
                ctx = canvas.getContext('2d'),
                dest = ctx.getImageData(x, y, img.width, img.height),
                i = buffer.data.length;

            while (i--) {
                buffer.data[i] = buffer.data[i] || dest.data[i];
            }

            ctx.putImageData(buffer, x, y);
        },

        afterFrame: function (canvas) {}
    }
};
