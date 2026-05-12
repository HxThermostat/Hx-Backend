// https://github.com/nirsky/react-native-size-matters
// This essentially is the only part of the above library that we need, so I just generally bring this in alone instead of the whole package.

import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device - We can adjust this ourselves
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = (size: number): number =>
  (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size: number): number =>
  (longDimension / guidelineBaseHeight) * size;

export const moderateScale = (size: number, factor = 0.5): number =>
  size + (scale(size) - size) * factor;

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;

// Let's bring in the MIT license for where this function comes from though:

// MIT License

// Copyright (c) 2017 Nir Hadassi

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
