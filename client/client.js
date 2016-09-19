function put(value) {
  var value = value;

  fetch('/todo', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ value: data }),
  })
}
