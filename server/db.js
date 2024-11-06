const mongoose = require('mongoose');

const uri = "mongodb+srv://elguito2003:8xJQaxClIccmx3Ji@sneakerlounge.sx8tn.mongodb.net/?retryWrites=true&w=majority&appName=SneakerLounge";


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(uri)
    console.log("MONGOOSE CONNECTION OPEN");
}



module.exports=main