EXTERNAL_URL = 'https://nftapi.bscstation.org/api/Ido/GetClaimProcessing';

const callAPI = (callback) =>{
    http.get(EXTERNAL_URL, (res) =>{
        let data = '';

        res.on('data', (data1) =>{
            data = data + data1;
        });
        res.on('end', () =>{
            return callback(data)
        });
    }).on('err', (err)=>{
        console.log("Err: " +err.message);
    });
}

module.exports.callAPI = callAPI