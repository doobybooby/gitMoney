fetch('https://cloud.iexapis.com/stable/tops?token=pk_c8d7d7e3518b4e56a01954d57b57e33e&symbols=aapl,fb,snap,bac,c,tdoc')
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

    let bac = data[3];
    let newBac = `bac: ${bac.lastSalePrice}`;
    document.getElementById("bac").innerHTML = newBac;
    
    let citi = data[4];
    let newCiti = `c: ${citi.lastSalePrice}`;
    document.getElementById("citigroup").innerHTML = newCiti;

    let tdoc = data[5];
    let newTdoc = `tdoc: ${tdoc.lastSalePrice}`;
    document.getElementById("teladoc").innerHTML = newTdoc;
  });
