import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import ProdutoVariacao from "./ProdutoVariacao";

@Entity("produto")
export default class Produto {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column()
    imagem: string;

    @OneToMany(() => ProdutoVariacao, produtoVariacao => produtoVariacao.produto)
    produtoVariacao: ProdutoVariacao[];

    @CreateDateColumn()
    criado_em: Date;

    @UpdateDateColumn()
    atualizado_em: Date;
}