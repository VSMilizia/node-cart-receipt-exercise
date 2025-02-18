import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";
import * as fs from "fs";

var dirName = "receipts";
core.createDir(dirName);

for (let cartRow of carts) {                    // -- Cycle all cart in carts

    let ticket = [];                            // -- Instantiate ticket

    ticket.push(core.generateDecor("+"));
    ticket.push(core.getHeader());
    ticket.push(core.getDate());
    ticket.push(core.generateDecor("*"));       // -- Header end

    let products = cartRow.products;
                                                
    let total = products.reduce((acc,product)=>{  // -- Associate ean code with product name and price
        let productDetails = core.getProduct(product);
        acc += productDetails[2];               
        ticket.push("\t" + productDetails.join("\t"));  // -- Meanwhile list the products
        return acc;
    },0);

    if (total == 0){                            // -- If the cart is empty continue to next ticket
        console.log("No products in user:"+cartRow.user);
        continue;
    }

    ticket.push(core.generateDecor("*"));

    ticket.push(`\tTotale:\t\t\t\t${total.toFixed(2)}`);    

    ticket.push(core.generateDecor("+"));

    var user = users.find(obj => obj.uuid == cartRow.user); // -- Get the user object

    if (user.promo){                            // -- Insert the discount due to promo code
        var promo = promoCode.find(obj => obj.name == user.promo);
        ticket.push(core.generateDiscount(promo,total));
        ticket.push(core.generateDecor("+"));
        total = total*(1-promo.percentage);
    };    

    ticket.push("");                            // -- Add an empty line
    ticket.push(core.generateDecor("**"));      // -- and decoration

    if(user.wallet<total){                      // -- Check available credit
        continue;
    }else{
        ticket.push(core.creditUpdate(user,total));  
    }
    
    ticket.push(core.generateDecor("**"));      // -- End of ticket

    var ticketName = core.createTicketName(user);

    fs.writeFileSync(`receipts/${ticketName}.txt`,ticket.join("\n"));
}
