import constants from './constants';

/**
 * This is an all-purpose fetch request handler.
 *
 * @param {string} path appended to the API_ROOT_URL constant to form the url
 * @param {string} method 'GET' 'POST' 'PUT' 'DELETE' are options
 * @param {*} body any data type provided is converted to JSON for the request body.
 * @param {string} fromFile the name of the file calling this method, for debug purposes.
 * @returns {object} {ok: true/false, data: response data}
 */
export async function httpFetchHelper(path, method, body) {
  const result = {};
  const url = constants.API_ROOT_URL + path;
  const init = {
    method,
    headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
  };

  if (body !== null) init.body = JSON.stringify(body);
  try {
    const response = await fetch(url, init);
    result.ok = response.ok;
    result.status = response.status;
    const data = await response.json();
    result.data = data;
  } catch (exception) {
    console.error(exception);
  }
  return result;
}

export default httpFetchHelper;
