//
//  HttpCache.m
//  YibeiApp
//
//  Created by zhangxu on 2018/6/21.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "HttpCache.h"
#import "React/RCTImageLoader.h"
#import "React/RCTBridge.h"

@implementation HttpCache

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(HttpCache);

RCT_EXPORT_METHOD(getHttpCacheSize:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
  NSURLCache *httpCache = [NSURLCache sharedURLCache];
  resolve(@([httpCache currentDiskUsage]));
}

RCT_EXPORT_METHOD(clearHttpCache:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
  NSURLCache *httpCache = [NSURLCache sharedURLCache];
  [httpCache removeAllCachedResponses];
  resolve(nil);
}


RCT_EXPORT_METHOD(getImageCacheSize:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
  resolve(@0);
}

RCT_EXPORT_METHOD(clearImageCache:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
  resolve(nil);
}

@end
