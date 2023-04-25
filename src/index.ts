import 'dotenv/config';

import { createAgent } from '@forestadmin/agent';
import { createSqlDataSource } from '@forestadmin/datasource-sql';

import { Schema } from '../typings';

// Create your Forest Admin agent
// This must be called BEFORE all other middleware on the app
const agent = createAgent<Schema>({
  authSecret: process.env.FOREST_AUTH_SECRET,
  envSecret: process.env.FOREST_ENV_SECRET,
  // isProduction: process.env.NODE_ENV === 'production',
  isProduction: false,
  typingsPath: './typings.ts',
  typingsMaxDepth: 5,
  
  })
  // Create your SQL datasource
  .addDataSource(createSqlDataSource(process.env.DATABASE_URL))
  // Replace "myExpressApp" by your Express application
  .customizeCollection('customers', collection => {
    collection
    // Create a new field
    .addField('fullname', {
      columnType: 'String',
      dependencies: ['firstname', 'lastname'],
      getValues: (records, context) => records.map(r => `${r.firstname} ${r.lastname}`),
    })
  
    // // Make it writable,
    // .replaceFieldWriting('fullname', (value, context) => {
    //   const [firstName, lastName] = value.split(' ');
  
    //   return { firstName, lastName };
    // })
  
    // // Make it filterable and sortable
    // .emulateFieldFiltering('fullname')
    // .emulateFieldSorting('fullname')
    // ;
  })
  .customizeCollection('companies', collection =>
    collection.addAction('Mark as live', {
      scope: 'Single',
      execute: async (context, resultBuilder) => {
        console.log('mark as live');
      // Change the company's status to live.
        await context.collection.update(context.filter, { status: 'live' });
      },
    }))
  .customizeCollection('companies', collection =>
    collection.addHook('After', 'Update', async context => {
      console.log('hook after update');
      console.log(context);
      // The result of the create function always return an array of records
      const id = context.collection.getForm('id');
      console.log(id);
  }))
  .mountOnStandaloneServer(3000, '127.0.0.1')
  .start();




