import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import mongoose, { Connection } from 'mongoose';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DatabaseConfig implements OnModuleInit, OnModuleDestroy {
  private prismaClient: PrismaClient | null = null;
  private mongooseConnections: Map<string, Connection> = new Map();
  private dynamoDBClients: Map<string, DynamoDBDocumentClient> = new Map();

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.initializePrisma();
    await this.initializeMongoose();
    this.initializeDynamoDB();
  }

  async onModuleDestroy() {
    await this.closePrismaConnection();
    await this.closeMongooseConnections();
  }

  async initializePrisma(): Promise<PrismaClient> {
    if (this.prismaClient) {
      return this.prismaClient;
    }

    const databaseUrl = this.configService.get<string>('DATABASE_URL');
    const databaseType = this.configService.get<string>('DATABASE_TYPE', 'postgresql');

    this.prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
      log: ['error', 'warn'],
    });

    try {
      await this.prismaClient.$connect();
      console.log(`Connected to ${databaseType} database via Prisma`);
    } catch (error) {
      console.error('Failed to connect to Prisma database:', error);
      throw error;
    }

    return this.prismaClient;
  }

  getPrismaClient(): PrismaClient {
    if (!this.prismaClient) {
      throw new Error('Prisma client not initialized. Call initializePrisma() first.');
    }
    return this.prismaClient;
  }

  async initializeMongoose(): Promise<void> {
    const mongoUris = this.configService.get<string>('MONGO_URIS', 'mongodb://localhost:27017').split(',');
    const mongoDbNames = this.configService.get<string>('MONGO_DB_NAMES', 'product_db').split(',');

    for (let i = 0; i < mongoUris.length; i++) {
      const uri = mongoUris[i].trim();
      const dbName = mongoDbNames[i]?.trim() || `product_db_${i}`;

      try {
        const connection: Connection = mongoose.createConnection(uri, {
          dbName,
          maxPoolSize: 10,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        });

        await connection.asPromise();
        this.mongooseConnections.set(dbName, connection);
        console.log(`Connected to MongoDB: ${dbName}`);
      } catch (error) {
        console.error(`Failed to connect to MongoDB ${dbName}:`, error);
      }
    }
  }

  getMongooseConnection(dbName: string = 'product_db'): Connection | null {
    return this.mongooseConnections.get(dbName) || null;
  }

  getAllMongooseConnections(): Map<string, Connection> {
    return this.mongooseConnections;
  }

  initializeDynamoDB(): void {
    const awsRegion = this.configService.get<string>('AWS_REGION', 'us-east-1');
    const awsEndpoint = this.configService.get<string>('AWS_DYNAMODB_ENDPOINT');
    const tableNames = this.configService.get<string>('DYNAMODB_TABLES', 'products').split(',');

    const clientConfig: any = {
      region: awsRegion,
    };

    if (awsEndpoint) {
      clientConfig.endpoint = awsEndpoint;
      clientConfig.tls = false;
    }

    const dynamoClient = new DynamoDBClient(clientConfig);
    const docClient = DynamoDBDocumentClient.from(dynamoClient, {
      marshallOptions: {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true,
      },
    });

    this.dynamoDBClients.set('default', docClient);

    for (const tableName of tableNames) {
      const trimmedTable = tableName.trim();
      if (trimmedTable && trimmedTable !== 'products') {
        this.dynamoDBClients.set(trimmedTable, docClient);
      }
    }

    console.log(`DynamoDB client initialized for region: ${awsRegion}`);
  }

  getDynamoDBClient(tableName: string = 'default'): DynamoDBDocumentClient {
    const client = this.dynamoDBClients.get(tableName);
    if (!client) {
      return this.dynamoDBClients.get('default')!;
    }
    return client;
  }

  getDynamoDBTableName(): string {
    return this.configService.get<string>('DYNAMODB_TABLE_NAME', 'products');
  }

  private async closePrismaConnection(): Promise<void> {
    if (this.prismaClient) {
      await this.prismaClient.$disconnect();
      console.log('Prisma connection closed');
    }
  }

  private async closeMongooseConnections(): Promise<void> {
    for (const [name, connection] of this.mongooseConnections.entries()) {
      await connection.close();
      console.log(`MongoDB connection closed: ${name}`);
    }
  }

  isConnected(databaseType: 'sql' | 'nosql' | 'dynamodb'): boolean {
    switch (databaseType) {
      case 'sql':
        return this.prismaClient !== null;
      case 'nosql':
        return this.mongooseConnections.size > 0;
      case 'dynamodb':
        return this.dynamoDBClients.size > 0;
      default:
        return false;
    }
  }
}