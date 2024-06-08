export const removeDuplicatesByNestedKey = (array:any, keyPath:any) => {
  const seen = new Set();
  return array?.filter((item:any) => {
    // Retrieve the value from the nested key path
    const keyValue = keyPath.split('.').reduce((obj:any, key:any) => obj && obj[key], item);
    if (seen.has(keyValue)) {
      return false;
    } else {
      seen.add(keyValue);
      return true;
    }
  });
};