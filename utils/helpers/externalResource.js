
/**
 * Loads an external library. Does this by creating a script tag in memory.
 * @param {Object} props 
 * @param {Function} onLoaded 
 */
export const loadExternalResource = (props, onLoaded) => {
  const script = document.createElement('script')
  script.type = 'text/javascript';

  if (script.readyState){  // IE
    script.onreadystatechange = () => {
      if (script.readyState == 'loaded' || script.readyState == 'complete') {
        script.onreadystatechange = null;
        onLoaded && onLoaded()
      }
    };
  } 
  else {  // Others
    script.onload = () => onLoaded && onLoaded()
  }

  // assign all script attributes
  Object
    .keys(props)
    .map(key => {
      script[key] = props[key]
    })

  document
    .getElementsByTagName('head')[0]
    .appendChild(script);
}
