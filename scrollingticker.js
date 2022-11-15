fetch('https://cloud.iexapis.com/stable/tops?token=pk_c8d7d7e3518b4e56a01954d57b57e33e&symbols=aapl,snap,bac,c,tdoc,jpm')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let aapl = data[0];
    let newAppl = `aapl: ${aapl.lastSalePrice}`;
    document.getElementById("aapl").innerHTML = newAppl;
    // console.log(aapl.lastSalePrice);

    let snap = data[1];
    let newSnap = `snap: ${snap.lastSalePrice}`;
    document.getElementById("snap").innerHTML = newSnap;

    let bac = data[2];
    let newBac = `bac: ${bac.lastSalePrice}`;
    document.getElementById("bac").innerHTML = newBac;
    
    let citi = data[3];
    let newCiti = `citi: ${citi.lastSalePrice}`;
    document.getElementById("citigroup").innerHTML = newCiti;

    let teladoc = data[4];
    let newTeladoc = `teladoc: ${teladoc.lastSalePrice}`;
    document.getElementById("teladoc").innerHTML = newTeladoc;

    let jpm = data[5];
    let newJpm = `JPMorgan: ${jpm.lastSalePrice}`;
    document.getElementById("JPMorgan").innerHTML = newJpm;
  });
