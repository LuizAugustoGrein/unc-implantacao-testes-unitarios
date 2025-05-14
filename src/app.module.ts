import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BooksController } from './books/books.controller';

import { AppService } from './app.service';
import { BooksService } from './books/books.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
    imports: [],
    controllers: [AppController, BooksController],
    providers: [AppService, BooksService, PrismaService],
})
export class AppModule { }
