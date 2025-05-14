import { Test } from '@nestjs/testing';
import { BooksService } from './books.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BooksService', () => {
    let service: BooksService;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [BooksService, PrismaService]
        }).compile();

        service = module.get(BooksService);
    })

    it('deve criar e recuperar um livro', async () => {
        const created = await service.create({
            title: 'Titulo de um livro',
            author: 'Autor do livro',
            year: 2010
        });

        const found = await service.findOne(created.id);

        expect(found).toMatchObject({
            title: 'Titulo de um livro',
            author: 'Autor do livro',
            year: 2010
        });
    })

    it('deve remover um livro', async () => {
        const created = await service.create({
            title: 'Titulo de um livro',
            author: 'Autor do livro',
            year: 2010
        });

        await service.delete(created.id);

        const found = await service.findOne(created.id);

        expect(found).toBeNull();
    })

    it('deve atualizar um livro existente', async () => {
        const created = await service.create({
            title: 'Titulo de um livro',
            author: 'Autor do livro',
            year: 2010
        });
        
        const updated = await service.update(created.id, {
            year: 2020
        })

        expect(updated).toMatchObject({
            title: 'Titulo de um livro',
            author: 'Autor do livro',
            year: 2020
        })
    })
})