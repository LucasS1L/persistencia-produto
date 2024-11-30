import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import Produto from "./Produto";

@Entity("produto_variacao")
export default class ProdutoVariacao {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => Produto)
    @JoinColumn({name: "produto_id"})
    produto: Produto;

    @Column()
    tamanho: string;

    @Column("decimal")
    preco: number;

    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;
}