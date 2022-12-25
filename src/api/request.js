import { API_ROUTES } from "./routes";

const createURL = (url, params) => {
  return url + "?" + new URLSearchParams(params).toString();
};

const request = (url, params, method, body, headers, callback, onprogress) => {
  const promise = new Promise((resolve) => {
    let xml = new XMLHttpRequest();
    xml.open(method, createURL(url, params));
    Object.entries(headers).forEach((entry) => {
      xml.setRequestHeader(entry[0], entry[1]);
    });
    xml.send(JSON.stringify(body));
    xml.onload = (e) => {
      let result;
      try {
        result = JSON.parse(xml.responseText);
      } catch (ex) {
        console.error(ex);
        result = { code: 500, query: "Something went wrong" };
      }
      callback(result);
      resolve();
    };
    xml.onprogress = onprogress;
  });

  return promise;
};

const getDetails = async (callback, onprogress) => {
  return await request(
    API_ROUTES.DETAILS,
    {},
    "post",
    {},
    { "Content-Type": "application/json" },
    callback,
    onprogress
  );
};

const sendMessage = async (body, callback, onprogress) => {
  return await request(
    API_ROUTES.MESSAGES,
    {},
    "post",
    body,
    {
      "Content-Type": "application/json",
    },
    callback,
    onprogress
  );
};

const getWork = async (callback, onprogress) => {
  return await request(
    API_ROUTES.WORK,
    {},
    "post",
    {},
    {
      "Content-Type": "application/json",
    },
    callback,
    onprogress
  );
};

export { getDetails, sendMessage, getWork };
