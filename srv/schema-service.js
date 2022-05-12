const cds = require("@sap/cds")

module.exports = cds.service.impl(async function () {
    const {
        Products,
        Suppliers,
        Categories
    } = this.entities;

    this.before("CREATE", Products, async (req) => { // validar categoria y supplier
        const tx = cds.transaction(req)
        // Con trim, resolvemos si nos envían espacios vacios adelante y detrás
        req.data.productName = req.data.productName.trim();
        const {
            productName
        } = req.data;

        console.log(productName)
        let nameExist = await tx.run(SELECT.from(Products).where({
            productName
        }));

        nameExist.length ?
            req.reject(400, 'Ya existe un producto con ese nombre.') :
            console.log("Producto creado con éxito.");

        // Otra manera de Resolver el error sería:
        // let err = new Error("Ya existe un producto con ese nombre")
        // err.code = 400
        // throw err

    });

    this.before("UPDATE", Products, async (req) => { // validar categoria y supplier
        const tx = cds.transaction(req)
        console.log("LA REQUEST!!!: ", req.data);
        // Con trim, resolvemos si nos envían espacios vacios adelante y detrás
        if (req.data.productName) {
            req.data.productName = req.data.productName.trim();
        }

        const {
            productName
        } = req.data;

        let nameExist = await tx.run(SELECT.from(Products).where({
            productName
        }));

        nameExist.length ?
            req.reject(400, 'Ya existe un producto con ese nombre.') :
            console.log("Producto creado con éxito.");

    });


})