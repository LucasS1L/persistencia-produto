import {DataSource} from "typeorm";
import Produto from "../../modules/produto/typeorm/entities/Produto";
import ProdutoVariacao from "../../modules/produto/typeorm/entities/ProdutoVariacao";
import {CreateProduto1729343362869} from "./migrations/1729343362869-CreateProduto";
import {CreateProdutoVariacao1729344946640} from "./migrations/1729344946640-CreateProdutoVariacao";
import {addTransactionalDataSource, initializeTransactionalContext} from "typeorm-transactional";
import {config} from "dotenv";
import path from "path";

config({path: path.resolve(__dirname, "../../../.env")});

export const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [
        Produto,
        ProdutoVariacao,
    ],
    migrations: [
        CreateProduto1729343362869,
        CreateProdutoVariacao1729344946640,
    ]
});

initializeTransactionalContext();
addTransactionalDataSource(dataSource);