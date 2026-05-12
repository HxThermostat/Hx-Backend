//
// TTWKActivityIndicator
// Copyright (c) 2015, TouchTribe B.V. All rights reserved.
//
// This source code is available under the MIT license. See the LICENSE file for more info.
//

#import "TTWKActivityIndicator.h"

#import <UIKit/UIKit.h>
#import <WatchKit/WatchKit.h>

/** 
 * This is to hold the differences between indicators of different styles.
 */
@protocol TTWKActivityIndicatorConfig <NSObject>

/** When the looped part of the animation starts. */
- (NSTimeInterval)loopStartTime;

/** How long the looped part of the animation is. */
- (NSTimeInterval)loopDuration;

/** Number of frames the looped part of the animation will occopy for the given frame rate (frames per second). */
- (NSInteger)numberOfFramesForFrameRate:(CGFloat)frameRate;

//
// These 3 methods define what happens to the angle, brightness and scale of bubbles over time
//
- (CGFloat)brightnessForBubbleWithIndex:(NSInteger)index time:(NSTimeInterval)time;
- (CGFloat)angleForBubbleWithIndex:(NSInteger)index time:(NSTimeInterval)time;
- (CGFloat)scaleForRadiusOfBubbleWithIndex:(NSInteger)index time:(NSTimeInterval)time;
- (CGFloat)offsetForBubbleWithIndex:(NSInteger)index time:(NSTimeInterval)time;

@end

/** 
 * Defines how the indicator was animated in Apple Watch betas.
 */
@interface TTWKActivityIndicatorConfigBeta : NSObject <TTWKActivityIndicatorConfig>
@end

@implementation TTWKActivityIndicatorConfigBeta {
	CGFloat _rotationSpeed;
	CGFloat _risingTime;
	CGFloat _risingDelay;
}

- (instancetype)init {

	if (self = [super init]) {

		// Revolutions per second
		_rotationSpeed = 2.0 / 3;

		_risingTime = (1.0 / 6) / _rotationSpeed;

		_risingDelay = 1.0 / 30;
	}

	return self;
}

- (NSTimeInterval)loopStartTime {
	// Let's start it from the second revolution to ensure no fading in animation is captured
	return 2 / _rotationSpeed;
}

- (NSTimeInterval)loopDuration {
	// In theory we can just divide it by 6 — the image is symmetrical, but in practice
	// it's better to have the full cycle so it's smoother
	return 1 / _rotationSpeed;
}

- (NSInteger)numberOfFramesForFrameRate:(CGFloat)frameRate {
	return roundf([self loopDuration] * frameRate);
}

- (CGFloat)brightnessForBubbleWithIndex:(NSInteger)index time:(NSTimeInterval)time {
	return MAX(0, MIN((time - _risingDelay * index) / _risingTime, 1));
}

- (CGFloat)angleForBubbleWithIndex:(NSInteger)index time:(NSTimeInterval)time {
	return time * _rotationSpeed * 2 * M_PI + index * 2 * M_PI / 6 - M_PI / 2;
}

- (CGFloat)scaleForRadiusOfBubbleWithIndex:(NSInteger)index time:(NSTimeInterval)time {
	return sqrt([self brightnessForBubbleWithIndex:index time:time]);
}

- (CGFloat)offsetForBubbleWithIndex:(NSInteger)index time:(NSTimeInterval)time {
	// No extra offsets for beta-style animations
	return 0;
}

@end

/** 
 * Settings for the modern indicator.
 */
@interface TTWKActivityIndicatorConfigModern : NSObject <TTWKActivityIndicatorConfig>
@end

@implementation TTWKActivityIndicatorConfigModern

- (instancetype)init {
	if (self = [super init]) {
	}
	return self;
}

- (NSTimeInterval)loopStartTime {
	// This one starts with time 0, there is no initial sequence that is different from the looped part
	return 0;
}

- (NSTimeInterval)loopDuration {
	// Exactly single revolution per second
	return 1;
}

- (NSInteger)numberOfFramesForFrameRate:(CGFloat)frameRate {
	return roundf([self loopDuration] * frameRate);
}

- (NSTimeInterval)internalTimeForBubbleWithIndex:(NSInteger)index time:(NSTimeInterval)time {
	NSTimeInterval t = time - 0.5 * index / 3;
	t = fabs(t - floor(t) - 0.5) / 0.5;
	return t;
}

- (CGFloat)brightnessForBubbleWithIndex:(NSInteger)index time:(NSTimeInterval)time {

	// The brightness is just linearly pulsing
	NSTimeInterval t = [self internalTimeForBubbleWithIndex:index time:time];

	const CGFloat minBrightness = 0.3;
	const CGFloat maxBrightness = 1;
	return minBrightness * (1 - t) + maxBrightness * t;
}

- (CGFloat)angleForBubbleWithIndex:(NSInteger)index time:(NSTimeInterval)time {
	// For this style the angle always stays the same
	return index * 2 * M_PI / 6 - M_PI / 2;;
}

- (CGFloat)scaleForRadiusOfBubbleWithIndex:(NSInteger)index time:(NSTimeInterval)time {
	// Radius of bubbles never changes (although it appears to be due to the brightness change)
	return 1;
}

- (CGFloat)offsetForBubbleWithIndex:(NSInteger)index time:(NSTimeInterval)time {
	// In the modern animation the bubbles shift a bit from the center
	return 0.5 * (1 - [self internalTimeForBubbleWithIndex:index time:time]);
}

@end


//
//
//
@implementation TTWKActivityIndicator {

	TTWKActivityIndicatorStyle _style;

	id<TTWKActivityIndicatorConfig> _config;

	// Radius of a single bubble
	CGFloat _bubbleRadius;

	// Color of the bubbles
	UIColor *_color;
}

+ (id<TTWKActivityIndicatorConfig>)configForStyle:(TTWKActivityIndicatorStyle)style {

	switch (style) {

		case TTWKActivityIndicatorStyleModern:
			return [[TTWKActivityIndicatorConfigModern alloc] init];

		case TTWKActivityIndicatorStyleBeta:
			return [[TTWKActivityIndicatorConfigBeta alloc] init];

		default:
			NSAssert(NO, @"");
			return nil;
	}
}

+ (CGFloat)defaultFrameRate {
	return 30;
}

- (id)initWithStyle:(TTWKActivityIndicatorStyle)style color:(UIColor *)color bubbleRadius:(CGFloat)bubbleRadius {

	if (self = [super init]) {

		_style = style;

		_config = [TTWKActivityIndicator configForStyle:_style];

		_bubbleRadius = bubbleRadius > 0 ? bubbleRadius : 4;

		_color = color;
	}

	return self;
}

- (id)initWithColor:(UIColor *)color bubbleRadius:(CGFloat)bubbleRadius {
	return [self initWithStyle:TTWKActivityIndicatorStyleDefault color:color bubbleRadius:bubbleRadius];
}

- (id)initWithColor:(UIColor *)color {
	return [self initWithStyle:TTWKActivityIndicatorStyleDefault color:color bubbleRadius:0];
}

#pragma mark -

- (CGSize)size {
	CGFloat radius = 3 * 2 * (_bubbleRadius + 1);
	return CGSizeMake(radius, radius);
}

- (void)drawForTime:(NSTimeInterval)time {

	CGSize size = [self size];
	CGRect b = CGRectMake(0, 0, size.width, size.height);
	CGPoint center = CGPointMake(b.origin.x + b.size.width * 0.5, b.origin.y + b.size.height * 0.5);

	CGContextRef c = UIGraphicsGetCurrentContext();

	for (NSInteger i = 0; i < 6; i++) {

		// How big and light the current bubble is
		CGFloat brightness = [_config brightnessForBubbleWithIndex:i time:time];

		// Current angle of the bubble
		CGFloat angle = [_config angleForBubbleWithIndex:i time:time];

		// Current radius of the bubble (sqrt ensures the area of the bubble grows linearly)
		CGFloat r = [_config scaleForRadiusOfBubbleWithIndex:i time:time] * _bubbleRadius;

		// Distance to the bubble's center from our center, +1 allows some distance between bubbles, so they don't stick
		CGFloat distanceToBubbleCenter = 2 * r + 1 + [_config offsetForBubbleWithIndex:i time:time] * _bubbleRadius / 4;

		// OK, let's draw the bubble
		[_color setFill];
		CGContextSetAlpha(c, brightness);

		CGPoint bubbleCenter = CGPointMake(
			center.x + distanceToBubbleCenter * cos(angle),
			center.y + distanceToBubbleCenter * sin(angle)
		);
		CGContextFillEllipseInRect(c, CGRectMake(bubbleCenter.x - r, bubbleCenter.y - r, 2 * r, 2 * r));
	}
}

- (NSTimeInterval)loopStartTime {
	return [_config loopStartTime];
}

- (NSTimeInterval)loopDuration {
	return [_config loopDuration];
}

- (UIImage *)animatedImage {
	return [self animatedImageForFrameRate:[TTWKActivityIndicator defaultFrameRate]];
}

- (UIImage *)animatedImageForFrameRate:(CGFloat)frameRate {

	NSInteger totalFrames = [_config numberOfFramesForFrameRate:frameRate];

	NSMutableArray *images = [[NSMutableArray alloc] init];
	for (NSInteger frame = 0; frame < totalFrames; frame++) {

		NSTimeInterval time = [self loopStartTime] + frame * [self loopDuration] / totalFrames;

		UIGraphicsBeginImageContextWithOptions([self size], NO, 2);

		[self drawForTime:time];

		UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
		UIGraphicsEndImageContext();

		[images addObject:image];
	}

	return [UIImage animatedImageWithImages:images duration:[self loopDuration]];
}

#pragma mark -

- (NSString *)cacheKey {

	// Sort of a version of the class, to ensure cached version won't be used when the code is updated
	const long version = 2;

	NSMutableString *key = [[NSMutableString alloc] init];
	[key appendFormat:@"%@%ld-%ld-%.1f", self, version, (long)_style, _bubbleRadius];

	const CGFloat *c = CGColorGetComponents(_color.CGColor);
	for (NSInteger i = 0; i < CGColorGetNumberOfComponents(_color.CGColor); i++) {
		[key appendFormat:@"-%.2f", c[i]];
	}

	return key;
}

- (void)setToGroupOrImage:(WKInterfaceObject *)groupOrImage {

	if ([groupOrImage isKindOfClass:[WKInterfaceGroup class]]) {

		WKInterfaceGroup *group = (WKInterfaceGroup *)groupOrImage;

        [group setBackgroundImage: [self animatedImage]];

		// We also need to ensure here that the animation has started, so no extra lines are required by the user.
		// Note that we are not using startAnimation method, which has a bug in that it plays any animation at max speed
		[group
			startAnimatingWithImagesInRange:NSMakeRange(0, [_config numberOfFramesForFrameRate:[TTWKActivityIndicator defaultFrameRate]])
			duration:[_config loopDuration]
			repeatCount:0
		];

	} else if ([groupOrImage isKindOfClass:[WKInterfaceImage class]]) {

		//
		// Well, it's the same process for WKInterfaceImage, just a few different method names
		//
		WKInterfaceImage *image = (WKInterfaceImage *)groupOrImage;
        [image setImage: [self animatedImage]];
		[image
			startAnimatingWithImagesInRange:NSMakeRange(0, [_config numberOfFramesForFrameRate:[TTWKActivityIndicator defaultFrameRate]])
			duration:_config.loopDuration
			repeatCount:0
		];

	} else {

		NSAssert(NO, @"%s expects either WKInterfaceGroup or WKInterfaceImage passed to it", sel_getName(_cmd));
	}
}

@end
