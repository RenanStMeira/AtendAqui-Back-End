import { Request, Response } from "express";
import prisma from "../Services/prismaService";
import bcrypt from 'bcrypt';

export  class ProviderController{
    async create(req: Request, res: Response) {
        const { name, email, contact, zipcode, address, password, isProvider } = req.body;

        const hash = await bcrypt.hash(password, 10);
        try {
            const newProvider = await prisma.provider.create({
                data: {
                    name, email, contact, zipcode, address, isProvider, password: hash
                },
            });

            const {password: _, ...provider} = newProvider;
            
            return res.status(200).json({ message: `Provider ${newProvider} criado com sucesso !` });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao criar Provider' })
        }
    };

   async findAll(req: Request, res: Response) {
       const { id } = req.params;

       try {
           const listAll = await prisma.provider.findMany({
               where: { id },
           });

           return res.status(200).json(listAll);
       } catch (error) {
           return res.status(400).json({ message: 'Erro ao buscar Provider' });
       }
   };

   async listId(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const listId = await prisma.provider.findUnique({
            where: { id },
        });
            return res.status(200).json(listId);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar Provider' });
        }
   };

   async updateProvider(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, contact, zipcode, address, password } = req.body;

    try {
        const listId = await prisma.provider.update({
            where: { id },
            data: {
                name: name, 
                email: email, 
                contact: contact, 
                zipcode: zipcode, 
                address: address, 
                password: password
            },
        });
            return res.status(200).json({ message:'Provider atualizado com sucesso!' });
        } catch {
            return res.status(400).json({ message: ' Erro ao atualizar Provider' });
        }
   };

   async deleteProvider(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const deleteprovider = await prisma.provider.delete({
            where: { id },
        });
        return res.status(200).json({message: `Provider ${deleteprovider} deletado com sucesso`});
    } catch (error) {
        return res.status(400).json({message:'Erro ao deletar Provider'});
    }
   };
};