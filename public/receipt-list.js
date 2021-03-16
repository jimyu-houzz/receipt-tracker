const loadReceipts = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', "http:localhost:3000/receipts", false);
    xhttp.send();
    console.log("start fetching");
    
    const receipts = JSON.parse(xhttp.responseText);
    console.log("Results: ", receipts);
    for(let receipt of receipts){
        const r = `
            <div class="col-4>
                <div c;ass="card>
                    <div class="card-body>
                        <div>Receipt ID: ${receipt.receiptId}</div>
                        <div>Date: ${receipt.date}</div>
                        <div>Total Amount: ${receipt.total}</div>
                        <hr>
                    </div>
                </div>
            </div>
            `   
        document.getElementById('receipts').innerHTML = document.getElementById('receipts').innerHTML + r;
    }
            
}

loadReceipts();