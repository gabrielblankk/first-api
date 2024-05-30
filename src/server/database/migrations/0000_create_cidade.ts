import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.cidade, table => {
      table.bigIncrements('id').primary().index()
      table.string('nome').index().notNullable().checkLength('>=', 3)
      table.string('estado').notNullable().checkLength('>=', 2)
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.cidade}`)
    })
  }
  
export async function down(knex: Knex) {
  return knex
  .schema
  .dropTable(ETableNames.cidade)
  .then(() => {
    console.log(`# Dropped table ${ETableNames.cidade}`)
  })
}
