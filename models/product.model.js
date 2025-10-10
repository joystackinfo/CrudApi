const monogoose = require('mongoose'); // include monogoose


const productSchema = new monogoose.Schema( // define a schema for the products and store it in productschema as a variable
    { 

        name:{
            type:String,
            required:[true, "product name is required"]
        },

          quantity:{
            type:Number,
            required:true,
            default:0
        },

          price:{
              type:Number,
              required:true,
              default:0
          }


}
);