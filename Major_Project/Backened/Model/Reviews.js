const mongoose=require("mongoose");
const {Schema}=mongoose

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/WonderLust")
}

main()
.then((res,err)=>{
    if (err) throw err;
}).catch((err)=>{
    console.log(err);
})

const review_Schema=mongoose.Schema(
    {
        Comment:{
            type:String,
            required:true
        },
        Rating:{
            type:Number,
            required:true
        },
        _createdAt:{
            type:Date
        }
    }
)

const review=mongoose.model("review",review_Schema);
module.exports=review;
