/**
 * Retrieves a nested property from an object based on a given key or array of keys.
 * If the property does not exist, it returns a default value.
 *
 * @param object - The object to retrieve the property from.
 * @param keys - The key or array of keys representing the nested property.
 * @param defaultVal - The default value to return if the property does not exist. (optional)
 * @returns The value of the nested property or the default value if it does not exist.
 */
export function get(object, keys, defaultVal) {
  keys = Array.isArray(keys) ? keys : keys.split('.');
  object = object[keys[0]];
  if (object && keys.length > 1) {
    return get(object, keys.slice(1));
  }
  return object === undefined ? defaultVal : object;
}
