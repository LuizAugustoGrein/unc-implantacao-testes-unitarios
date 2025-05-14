import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Book } from '@prisma/client';

@Injectable()
export class BooksService {
    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<Book[]> {
        return this.prisma.book.findMany();
    }

    async findOne(id: number): Promise<Book | null> {
        return this.prisma.book.findUnique({ where: { id } });
    }

    async create(data: Omit<Book, 'id'>): Promise<Book> {
        return this.prisma.book.create({ data });
    }

    async update(id: number, data: Partial<Omit<Book, 'id'>>): Promise<Book> {
        return this.prisma.book.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<Book> {
        return this.prisma.book.delete({ where: { id } });
    }
}
