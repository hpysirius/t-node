'use strict';

module.exports = (options, app) => {
  return async function forbidip(ctx, next) {
    const forbidips = options.forbidips;
    const clientIp = ctx.request.ip;
    const hasIp = forbidips.some(val => {
      if (val === clientIp) {
        return true;
      }
    });
    if (hasIp) {
      ctx.status = 403;
      ctx.body = '你的ip已经被屏蔽';
    } else {
      await next();
    }
  };
};
