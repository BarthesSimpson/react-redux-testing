export const toArray = obj => Object.values(obj)

export const toObject = (arr, key) =>
  arr.reduce((obj, el) => {
    obj[el[key]] = el
    return obj
  }, {})

export const pluck = (obj, key, val) =>
  toObject(toArray(obj).filter(({ [key]: r_val }) => r_val !== val), key)
