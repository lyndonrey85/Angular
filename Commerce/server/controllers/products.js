var mongoose = require('mongoose');
var product = mongoose.model('product');

class ProductsController {
    // create: (req, res) =>{
    //     var product = new Product({
    //         title: req.body.title,
    //         description: req.body.description,
    //         price: req.body.price
    //     });
    create(req, res) {
        Product.create({ name: req.body.name, qty: req.body.product_id, price: req.body.price }, (err, products) => {
            if (err) {
                return res.json(err);
            }
                },
    //  show(req, res) {
    //     Product.findById(req.params.id).populate({ path: 'options', model: 'Product'}).exec((err, products) => {
    //         if (err) {
    //             return res.json(err);
    //         }
    //         return res.json(products);
    //     })
    // }
    
        show: (req, res)=>{
            Product.findById(req.params.id, (err, product)=>{
                if(err){
                    console.log("error when querying db for one product:", err);
                }
                else{
                    res.json({product: product});
                }
            })
        },
    
        update: (req, res)=> {
            // console.log("In the product controller, with this req.body:", req.body._id)
            var product = Product.findByIdAndUpdate({_id: req.body._id}, {$set: {
                name: req.body.name,
                qty: req.body.qty,
                price: req.body.price
            }},
            (err)=>{
                if(err){console.log("Error on product update:", err)
            }else{
                var thisProduct = Product.findById(req.body.product).populate('products');
                thisProduct.save();
                console.log("Product updated.")};
            })
        },
    
        delete: (req, res) => {
            const product = Product.findByIdAndRemove({_id: req.params.id}, err=>{
                if(err){console.log("Error on product delete:", err)}
                else{
                    thisProduct = Product.findById(req.params._id).populate('products').exec(
                        err=>{console.log("Error when attempting to update after product delete:",err)}, thisProduct=>{
                            thisUser.save();
                            console.log("Product updated.")});
                    console.log("Product deleted.")};
            })
        }
    }
}

module.exports  = new ProductsController();