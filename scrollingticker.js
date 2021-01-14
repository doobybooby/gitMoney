fetch('https://cloud.iexapis.com/stable/tops?token=pk_c8d7d7e3518b4e56a01954d57b57e33e&symbols=aapl,fb,snap')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let aapl = data[0];
    let newAppl = `aapl: ${aapl.lastSalePrice}`;
    document.getElementById("aapl").innerHTML = newAppl;
    // console.log(aapl.lastSalePrice);

    let fb = data[1];
    let newFb = `fb: ${fb.lastSalePrice}`
    document.getElementById("fb").innerHTML = newFb;

    let snap = data[2];
    let newSnap = `snap: ${snap.lastSalePrice}`;
    document.getElementById("snap").innerHTML = newSnap;
  });
