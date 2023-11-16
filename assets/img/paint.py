import numpy as np
from skimage import io,util,color

initial = io.imread("assets/img/avatar_bw.JPG")
grey = color.rgb2gray(initial)
signal = 1. - grey
blue = np.array([60, 112, 198])

png_blue_on_white = np.ones((*signal.shape,4),dtype=int)
png_blue_on_white[...,:3] = (png_blue_on_white[...,:3]*blue).astype(int)
png_blue_on_white[...,-1] = (255*signal).astype(int)
png_blue_on_white[:48 ,:,-1] = 255
png_blue_on_white[-48:,:,-1] = 255
png_blue_on_white[:,:48 ,-1] = 255
png_blue_on_white[:,-48:,-1] = 255
io.imsave(
    "assets/img/before_h3.png",
    util.img_as_ubyte(png_blue_on_white)
)

png_white_on_blue = np.ones((*signal.shape,4),dtype=int)
png_white_on_blue[...,:3] = (png_white_on_blue[...,:3]*blue*(1-signal).reshape((*signal.shape,1))).astype(int)
png_white_on_blue[...,-1] = (255*(1-signal)).astype(int)
io.imsave(
    "assets/img/before_h2.png",
    util.img_as_ubyte(png_white_on_blue)
)

