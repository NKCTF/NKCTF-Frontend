const {API_HOST, API_BASE} = require('api-config');

const API_PATH = window.API_PATH = new URL(API_BASE, API_HOST || window.location).href;

const spreadClass = (object) => {
  const keys = Object.keys(Reflect.getPrototypeOf(object));
  const ret = {};
  for (let key of keys) {
    ret[key] = object[key];
  }
  return ret;
};

const APIFetch = window.APIFetch = function(input, init = {}) {
  const isRequest = input instanceof Request;
  const origin = isRequest ? new URL(input.url).pathname : input;
  const url = new URL(origin.replace(/^\//, ''), API_PATH);
  const request = new Request(url, isRequest ? spreadClass(input) : undefined);
  return fetch(request, {...init, headers: {...init.headers, 'Accept': 'application/json'}}).
      then(response => {
        if(response.headers.get('Content-Type') === 'application/json') {
          const json = response.json();
          console.log(`request to ${url} got `, json);
          return json;
        } else if(response.ok) {
          return {
            code: response.status,
            status: response.status,
            data: response.text()
          }
        }
        return {
          code: -response.status,
          status: response.status,
          error: response.text()
        }
      }).catch(error => ({code: 504, msg: 'Gateway Error', error}));
};

const APIPost = window.APIPost = function(input, data, init = {}) {
  let body = data || init.body;
  const isJSON = typeof body === 'object';
  if (isJSON) body = JSON.stringify(body);
  return APIFetch(input, {
    ...init,
    method: 'POST',
    headers: {
      ...init.headers,
      'Content-Type': `application/${ isJSON
          ? 'json; charset=utf-8'
          : 'x-www-form-urlencoded'}`,
      'Accept': 'application/json',
    },
    body,
  });
};
