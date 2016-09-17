function post(evt) {
  var value = evt.target.value;

  fetch('/todo', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ value: data });
  })
}
