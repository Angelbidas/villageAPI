import {Schema,model} from 'mongoose'

const houseSchema=new Schema({
    head:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    spouse:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    child:[{
        type:Schema.Types.ObjectId,
        ref:'user'
    }]
});

const houseModel=model("house",houseSchema);

export default houseModel;