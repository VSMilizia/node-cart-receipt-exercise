import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";

Object.defineProperty(String.prototype, 'capitalize', {
    value: function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
  });
  
const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

const getHeader = () => {
    let userInfo = os.userInfo();
    let pid = os.getPriority();
    return userInfo.username.toUpperCase() + " Cart - " + pid;
};

const getDate = () => {

    let weekdayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let monthName = ["Jan", "Feb", "Mar", "Apr", "May","Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let d = new Date();
    

    let day = d.getDate();
    let year = d.getFullYear();
    let weekday = weekdayName[d.getDay()]
    let month = monthName[d.getMonth()];

    return `${weekday} ${month} ${day} ${year}` ;
};

const createDir = (dirName) => {
    fs.mkdir(dirName,
        (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        }); 
};

const createTiket = (user) => {
    let tiketName = user + "_receipt_" + 
    fs.writeFile(tiketName, 'bar', (err) => { if (err) throw err; });
};

const getProduct = (ean) => {
    let product = products.find(obj => obj.ean == ean);
    return [`[${ean}]`,product.name.toLowerCase().capitalize(),product.price];
};

const generateDecor = (decor) => {
    return `${decor} ${"-".repeat(50)} ${decor}`;
};

const generateDiscount = (promo,total) => {
    var discount = total*promo.percentage;
    return [`\tSconto:\t\t\t\t${discount.toFixed(2)}\n\tTotale Scontato:\t\t\t${(total-discount).toFixed(2)}\n\n\tCODICE PROMO:\t\t\t${promo.name}`
    ];
};

const creditUpdate = (user,total)=>{
    var credit = user.wallet;
    return `\t${user.firstName} ${user.lastName} ha un credito residuo di ${(credit-total).toFixed(2)}`; 
};

const createTicketName = (user) =>{
    let d = new Date();
    return `${user.uuid}_receipt_${d.getTime()}`;
};

export {
    discountedPrice,
    getHeader,
    getDate,
    createDir,
    getProduct,
    generateDecor,
    generateDiscount,
    creditUpdate,
    createTicketName,
};

console.log(generateDecor("*"));