import { Module, Logger, OnModuleInit, OnModuleDestroy, Inject, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductController } from './infrastructure/controllers/product.controller';
import { ProductService } from './application/services/product.service';
import { ProductSqlRepository } from './infrastructure/repositories/sql/product-sql.repository';
import { ProductNosqlRepository } from './infrastructure/repositories/nosql/product-nosql.repository';
import { DatabaseConfig } from './infrastructure/config/database.config';
import { ProductRepository } from './domain/repositories/product.repository';

export const PRODUCT_REPOSITORY_TOKEN = 'ProductRepository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [ProductController],
  providers: [
    DatabaseConfig,
    {
      provide: PRODUCT_REPOSITORY_TOKEN,
      useFactory: (configService: ConfigService, databaseConfig: DatabaseConfig): ProductRepository => {
        const dbType = configService.get<string>('DATABASE_TYPE', 'sql');
        const logger = new Logger('ProductRepositoryFactory');

        if (dbType === 'nosql') {
          logger.log('Inicializando repositorio NoSQL (MongoDB)');
          return new ProductNosqlRepository(databaseConfig.getMongooseConnection());
        }

        if (dbType === 'dynamodb') {
          logger.log('DynamoDB seleccionado - debe implementarse el repositorio correspondiente');
        }

        logger.log('Inicializando repositorio SQL (PostgreSQL/Prisma)');
        return new ProductSqlRepository();
      },
      inject: [ConfigService, DatabaseConfig],
    },
    ProductService,
  ],
  exports: [ProductService, PRODUCT_REPOSITORY_TOKEN],
})
export class AppModule implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AppModule.name);

  constructor(private readonly databaseConfig: DatabaseConfig) {}

  async onModuleInit() {
    this.logger.log('Inicializando módulo de aplicación');
    try {
      await this.databaseConfig.onModuleInit();
      this.logger.log('Conexiones de base de datos inicializadas correctamente');
    } catch (error) {
      this.logger.error('Error al inicializar conexiones de base de datos', error);
    }
  }

  async onModuleDestroy() {
    this.logger.log('Cerrando módulo de aplicación');
    try {
      await this.databaseConfig.onModuleDestroy();
      this.logger.log('Conexiones de base de datos cerradas correctamente');
    } catch (error) {
      this.logger.error('Error al cerrar conexiones de base de datos', error);
    }
  }
}