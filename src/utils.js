export default function recursiveDeepCopy(obj) {
  let clone, i;

  if (typeof obj !== "object" || !obj) return obj;

  if ("[object Array]" === Object.prototype.toString.apply(obj)) {
    clone = [];
    const len = obj.length;
    for (i = 0; i < len; i++) clone[i] = recursiveDeepCopy(obj[i]);
    return clone;
  }

  clone = {};
  for (i in obj)
    if (Object.prototype.hasOwnProperty.call(obj, i))
      clone[i] = recursiveDeepCopy(obj[i]);
  return clone;
}
