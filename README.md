Blitmark
==

A Benchmark for different methods of drawing an image to a canvas

Each example should provide three methods

    beforeFrame()
    drawSprite(Canvas canvas, Image img, int x, int y)
    afterFrame()

The images will be preloaded.

Methods
--

### drawImage

Uses the context's `drawImage` method.
This honors transparency.

### putImageData (w/ transparency)

Uses putImageData but honors transparency, by combining with the background in js.

### drawRect

Doesn't actually draw the image, but draws a placeholder rect.
Doesn't honor transparency.

### putImageData

Uses putImageData. Doesn't honor transparency.

### putImageData (compiled to arr)

Draws to a buffer, blitting ONLY the non-transparent pixels.
