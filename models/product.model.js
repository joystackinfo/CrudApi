const monogoose = require('mongoose'); // include monogoose


const productSchema = new monogoose.Schema( // define a schema for the products and store it in productschema as a variable
    {

        name: {
            type: String,
            required: [true, "product name is required"]
        },

        quantity: {
            type: Number,
            required: true,
            default: 0
        },


        price: {
            type: Number,
            required: true,
            default: 0
        },

        image: {
            type: String,
            required: false
        },

    },
    {
        timestamps: true // this will automatically add createdAt and updatedAt fields to the schema
    }

);


 const product = mongoose.model("product", productSchema) // create a model nmaed product using the schema

 module.exports = product // export the model so it can be used in other files