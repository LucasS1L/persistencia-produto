import {MigrationInterface, QueryRunner, Table, TableCheck, TableForeignKey} from "typeorm";

export class CreateProdutoVariacao1729344946640 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "produto_variacao",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "produto_id",
                    type: "int",
                },
                {
                    name: "tamanho",
                    type: "varchar(10)",
                },
                {
                    name: "preco",
                    type: "decimal",
                    precision: 10,
                    scale: 2
                },
                {
                    name: "criado_em",
                    type: "timestamp with time zone",
                    default: "now()",
                },
                {
                    name: "atualizado_em",
                    type: "timestamp with time zone",
                    default: "now()",
                }
            ]
        }));

        await queryRunner.createCheckConstraints("produto_variacao", [
            new TableCheck(
                {
                    name: "ck_preco",
                    expression: "preco >= 0.01"
                }
            )
        ]);

        await queryRunner.createForeignKey(
            "produto_variacao",
            new TableForeignKey({
                name: "ProdutoVariacaoProduto",
                columnNames: ["produto_id"],
                referencedTableName: "produto",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("produto_variacao", "ProdutoVariacaoProduto");
        await queryRunner.dropTable("produto_variacao");
    }

}
