
const cds = require("@sap/cds")

module.exports = cds.service.impl(async function () {
    const { Products, Suppliers, Categories } = this.entities

    this.before("CREATE", Products, async (req) => { // validar categoria y supplier
        const tx = cds.transaction(req)

        req.data.productName = req.data.productName.trim();
        const { productName } = req.data;

        console.log(productName)
        let nameExist = await tx.run(SELECT.from(Products).where({ productName }))

        if (nameExist.length) {
            /*  let err = new Error("Ya existe un producto con ese nombre")
             err.code = 400
             throw err */

            req.reject(400, 'Todo mal')

        } else {
            console.log("Producto creado :)")
        }
    });
})