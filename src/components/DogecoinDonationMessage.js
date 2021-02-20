const dogecoinAddress = 'DSSBMedZQNFgixBacfF3ARi6D8i9RRGg7o'

const copyDogecoin = (e) => {        
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', dogecoinAddress);
    dummy.select();
    document.execCommand("copy"); 
    document.body.removeChild(dummy)
    alert("Address copied to clipboard")
}

const DogecoinDonationMessage = () => {
    return (
        <div className="justify-content-center pt-5 pb-2 doge-container">
            <div className="row">
                <div className="col-6 d-flex">
                    <div className="m-auto">
                        <p>Want to support the development of Ameyo? Consider donating via Dogecoin.</p>
                        <p className="pt-3">For more information: check out <a href="http://www.dogecoin.com">www.dogecoin.com</a></p>
                    </div>
                </div>
                <div className="col-6 d-flex">
                    <div className="m-auto text-center justify-content-center">
                        <img src="/dogecoin.png" id="dogecoin-id"></img>
                        <div className="pt-3" onClick={copyDogecoin}>
                            <p style={{fontSize: "9.5px"}}>{dogecoinAddress}</p>
                            <p>📋 Click to copy address</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DogecoinDonationMessage