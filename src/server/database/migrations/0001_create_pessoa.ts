import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.pessoa, table => {
      table.bigIncrements('id').primary().index()
      table.string('nome').index().notNullable().checkLength('>=', 3)
      table.string('email').unique().notNullable().checkLength('>=', 5)
      
      table
        .bigInteger('cidadeId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.cidade)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.pessoa}`)
    })
  }
  
export async function down(knex: Knex) {
  return knex
  .schema
  .dropTable(ETableNames.pessoa)
  .then(() => {
    console.log(`# Dropped table ${ETableNames.pessoa}`)
  })
}
