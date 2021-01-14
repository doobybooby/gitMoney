fetch('https://cloud.iexapis.com/stable/tops?token=pk_c8d7d7e3518b4e56a01954d57b57e33e&symbols=aapl,fb,snap')
  .then(response => response.json())
  .then(data => console.log(data));
