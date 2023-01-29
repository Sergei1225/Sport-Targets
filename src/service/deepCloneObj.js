export const deepClone = (value) => {
    return typeof value !== "object"
        ? value
        : Array.isArray(value)
        ? value.map((item) => deepClone(item))
        : (() => {
              let obj = {};
              for (let i in value) obj[i] = deepClone(value[i]);
              return obj;
          })();
};
