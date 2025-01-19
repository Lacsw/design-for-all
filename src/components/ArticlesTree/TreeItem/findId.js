function findId(obj, valueToFind) {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (value === valueToFind) {
      return true;
    }
    if (typeof value === 'object' && value !== null) {
      if (findId(value, valueToFind)) {
        return true;
      }
    }
  }
  return false;
}

export default findId;
