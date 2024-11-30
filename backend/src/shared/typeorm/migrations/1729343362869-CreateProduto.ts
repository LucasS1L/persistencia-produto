import {MigrationInterface, QueryRunner, Table,TableForeignKey} from "typeorm";

export class CreateProduto1729343362869 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "produto",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "nome",
                    type: "varchar(50)",
                    isUnique: true,
                },
                {
                    name: "descricao",
                    type: "varchar(300)",
                },
                {
                    name: "imagem",
                    type: "varchar",
                    isNullable: true,
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("produto");
    }

}
