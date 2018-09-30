const {API_HOST, API_BASE} = require('api-config');

const API_PATH = new URL(API_BASE, API_HOST || window.location).href;

const spreadClass = (object) => {
  const keys = Object.keys(Reflect.getPrototypeOf(b));
  const ret = {};
  for (let key of keys) {
    ret[key] = object[key];
  }
  return ret;
};

const APIFetch = window.APIFetch = function(input, init) {
  const isRequest = input instanceof Request;
  const origin = isRequest ? new URL(input.url).pathname : input;
  const url = new URL(origin.replace(/^\//, ''), API_PATH);
  const request = new Request(url, isRequest ? spreadClass(input) : undefined);
  return fetch(request, init).then((response)=> {
    const json = response.json();
    console.log(json);
    return json;
  });
};

const APIPost = window.APIPost = function(input, data, init) {
  let body = data || init.body;
  const isJSON = typeof body === 'object';
  if(isJSON) body = JSON.stringify(body);
  return APIFetch(input, {
    ...init,
    method: "POST",
    headers: {
      "Content-Type": `application/${ isJSON ? 'json; charset=utf-8' : 'x-www-form-urlencoded'}`,
    },
    body
  })
};
