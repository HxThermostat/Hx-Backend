//
// TTWKActivityIndicator
// Copyright (c) 2015, TouchTribe B.V. All rights reserved.
//
// This source code is available under the MIT license. See the LICENSE file for more info.
//

#import <UIKit/UIKit.h>
#import <WatchKit/WatchKit.h>

/** 
 * Supported styles of activity indicators: the modern one and the one that was used in beta versions of Apple Watch OS.
 */
typedef NS_ENUM(NSInteger, TTWKActivityIndicatorStyle) {

	/** 
	 * The style closer to the indicator in the current version of the Apple Watch OS,
	 * the one with the bubbles only pulsing and not rotating around the center.
	 */
	TTWKActivityIndicatorStyleModern,

	/** 
	 * The one with its bubbles rotating around the center, similar to how it was in betas of the Apple Watch simulator 
	 * (and in hands-on videos from the Spring Forward event).
	 */
	TTWKActivityIndicatorStyleBeta,

	/** The style that should be used by default. */
	TTWKActivityIndicatorStyleDefault = TTWKActivityIndicatorStyleModern
};

/** 
 * Simplifies creating of Apple Watch style activity animations at run time, 
 * so there is no need to store prerendered image in the app's bundle in advance.
 *
 * It still uses the on-device image cache, so rendering will be delayed only the first time
 * an indicator of a given size/color/style is set.
 *
 * It's not the actual control (since you cannot have custom controls on Apple Watch yet), 
 * but rather a helper that is used to prerender a sequence of images (as a single 'animated' instance of UIImage) 
 * which then is fed to WKInterfaceImage or as a background image of WKInterfaceGroup.
 *
 * The helper can be also be used with regular iOS apps within drawRect:, in which case the initial 'fade in'
 * sequence can be also animated. (The initial animation sequence cannot be used on Apple Watch yet, 
 * because there is no way to loop an image animation from a non-first frame.) See TTWKActivityIndicatorView 
 * in this pod for an implementation suitable for normal iOS apps.
 *
 * To use this helper with WatchKit you'll need to add a WKInterfaceImage or WKInterfaceGroup into your storyboard
 * (this is where the indicator will appear), then create an instance of TTWKActivityIndicator and use its 
 * setToGroupOrImage: method to transfer the animated image. For example (assuming self.activityIndicator is 
 * WKInterfaceGroup or WKInterfaceImage in your controller):
 *
 * TTWKActivityIndicator *indicator = [[TTWKActivityIndicator alloc]
 *     initWithColor:[UIColor colorWithRed:1.0000 green:0.8824 blue:0.1020 alpha:1.0]
 *     bubbleRadius:2
 * ];
 * [indicator setToGroupOrImage:self.activityIndicator];
 *
 * Of course the image or group in your storyboard should be of proper size (or have it set to 'size fit the contents')
 * and it should have approprtiate mode, such as Center.
 */
@interface TTWKActivityIndicator : NSObject

/** 
 * Designated initializer.
 * Initializes with the style of the indicator, the color of its bubbles and the radius of a single bubble
 * (set it to 0 to use the default one).
 */
- (id)initWithStyle:(TTWKActivityIndicatorStyle)style color:(UIColor *)color bubbleRadius:(CGFloat)bubbleRadius;

/** A shortcut initializing the indicator with the default style. */
- (id)initWithColor:(UIColor *)color bubbleRadius:(CGFloat)bubbleRadius;

/** Another shortcut initializing the indicator with the default style and bubble size. */
- (id)initWithColor:(UIColor *)color;

/** 
 * Sets an animatiton of this activity indicator as a (background) image for the provided 
 * WKInterfaceGroup or WKInterfaceImage. 
 *
 * It uses the image cache of Apple Watch, if possible, so subsequent use of the same indicator 
 * (same by style/color/size, can be a different instance) will be faster.
 */
- (void)setToGroupOrImage:(WKInterfaceObject *)groupOrImage;

@end

/** 
 * The stuff that is not interested for normal use cases.
 */
@interface TTWKActivityIndicator (Subclasses)

/** 
 * Draws a single frame of the animation corresponding to the provided time.
 *
 * It will do this in the center of the rectangle with its origin at (0, 0) and size returned by -size method below.
 *
 * Note that the animation starts with its initial sequence when the bubbles fade in (at the timestamp 0),
 * you can use -loopStartTime to skip past this part.
 */
- (void)drawForTime:(NSTimeInterval)time;

/** 
 * Time the looped part of the animation begins.
 *
 * Together with -loopDuration this is handy when you want to skip the fade in sequence 
 * and capture only the looped part, like -animatedImage* methods do.
 */
- (NSTimeInterval)loopStartTime;

/** How long is a single looped part of the animation. */
- (NSTimeInterval)loopDuration;

/** The size of a minimal rect safely enclosing the whole animation. */
- (CGSize)size;

/** An animated image corresponding to the looped part of the animation at the provided frame rate (frames per second). */
- (UIImage *)animatedImageForFrameRate:(CGFloat)frameRate;

/** An animated image corresponding to the looped part of the animation at the default frame rate. */
- (UIImage *)animatedImage;

@end
