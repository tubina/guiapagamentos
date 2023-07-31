const express = require("express");
const MercadoPago = require("mercadopago");
const app = express();


MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-3099404363865686-073020-f7ca39089080a9eef013e1ac45339c2b-191395549"
});

app.get("/", (req, res)=>{
    res.send("Glória a Deus");
});

app.get("/pagar", async(req, res)=>{

    var id = "" +Date.now();
    var emailDoPagador =  "felipe@mail.com";

    var dados = {
        items: [
            item = {
                id: id,
                title: "5x video games;3x camisas",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            }
        ],
        payer:{
            email: emailDoPagador
        },
        external_reference: id,
    }

    try{
        var pagamento = await MercadoPago.preferences.create(dados);
        //console.log(pagamento);
        // aqui que eu colocaria o salvamento 
        // no banco de dados
        return res.redirect(pagamento.body.init_point);
    }catch(err){
        return res.send(err.message);
    }

});

app.post("/not", (req, res)=>{
    console.log(req.query);
    res.send("ok");
});

app.listen(80, ()=>{
    console.log("servidor rodando ");
});