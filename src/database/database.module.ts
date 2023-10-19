import { Module, Global } from '@nestjs/common';
// import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, database, host, password, port } = configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database,
        };
      },
    }),
  ],
  // providers: [
  //   {
  //     provide: 'PG',
  //     useFactory: (configService: ConfigType<typeof config>) => {
  //       const { user, database, host, password, port } = configService.postgres;
  //       const client = new Client({
  //         user,
  //         host,
  //         database,
  //         password,
  //         port,
  //       });
  //       client.connect();
  //       return client;
  //     },
  //     inject: [config.KEY],
  //   },
  // ],
  // exports: ['PG', TypeOrmModule],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
