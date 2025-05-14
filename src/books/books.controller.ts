import { Controller, Get, Param, Post, Delete, Body, NotFoundException } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from '@prisma/client';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get()
    findAll(): Promise<Book[]> {
        return this.booksService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Book> {
        const book = await this.booksService.findOne(+id);
        if (!book) throw new NotFoundException('Book not found');
        return book;
    }

    @Post()
    create(@Body() data: Omit<Book, 'id'>): Promise<Book> {
        return this.booksService.create(data);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<Book> {
        return this.booksService.delete(+id);
    }
}
