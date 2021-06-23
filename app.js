const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require("./models/Episodes");
const Episodes = mongoose.model('episodes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
}) 

mongoose.connect('mongodb+srv://HenriqueRonald:asd102030@cluster0.h6xsp.azure.mongodb.net/podcast?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
    console.log("conexao ao mongo realizada com sucesso");
}).catch((erro) => {
    console.log("error : ohh nao algo deu errado , verifique e tente novamente.");
});

app.get("/episodes", (req,res) => {
    Episodes.find({}).then((episodes) => {
        return res.json(episodes);
    }).catch((erro) => {
        return res.json(400).json({
            error: true,
            message: "nenhum episodes encontrado!!!"
        })
    })
});

app.get("/:id", (req, res) => {
    Episodes.findOne({_id:req.params.id}).then((episodes) =>{
        return res.json(episodes);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "nenhum episodes encontrado!!!"
        })
    })
});

app.post("/cadastrar", (req,res) => {
   const episodes = Episodes.create(req.body, (err) => {
       if(err) return res.status(400).json({
           error: true,
           message : "erro episodes nao foi cadastrado"
       })

       return res.status(200).json({
           error: false,
           message: " Episodes cadastrado com sucesso"
       })
   })
});

app.put("/:id", (req, res) => {
    const episodes = Episodes.updateOne({_id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: " error: episodes não foi editado!!!"
        });
        return res.json({
            error: false,
            message: "episodes editado com sucesso!!!"
        });
    });
});

app.delete("/:id", (req, res) => {
    const episodes = Episodes.deleteOne({_id: req.params.id}, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error : episodes nao foi deletado!!!"
        });

        return res.json({
            error: false,
            message: " episodes deletado com sucesso!!!"
        });
    });
});
app.listen(8080, () => {
    console.log("servidor rodando na porta 8080: http://localhost:8080");
});