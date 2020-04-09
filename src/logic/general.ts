"use strict";

export const deepFreeze = (obj: any) => {
  // will eliminate null
  if (!obj) {
    return obj;
  }
  // will eliminate array
  if (Array.isArray(obj)) {
    return Object.freeze(obj.map((o) => deepFreeze(o)));
  }
  if (typeof obj === "object") {
    return Object.freeze(
      Object.keys(obj).reduce((prev, key) => {
        return {
          ...prev,
          [key]: deepFreeze(obj[key]),
        };
      }, {})
    );
  }
  return obj;
};
