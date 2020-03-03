export function buildResponse(body) {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    body
  };
  return options;
}

export function buildTextResponse(message) {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    body: message
  };
  return options;
}
