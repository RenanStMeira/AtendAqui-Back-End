import { Request, Response } from "express";
import prisma from "../Services/prismaService";

export  class UserController{
    async create(req: Request, res: Response) {
        const { name, email, contact, zipcode, adress, password } = req.body;
        try {
            const newUser = await prisma.users.create({
                data: {
                    name, email,contact, zipcode, adress, password
                }
            })
            return res.status(200).json({ message: `Usuario ${newUser} criado com sucesso !` });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao criar usuario' })
        }
    };

   async findAll(req: Request, res: Response) {
       const { id } = req.params;

       try {
           const listAll = await prisma.users.findMany({
               where: { id },
           });

           return res.status(200).json(listAll);
       } catch (error) {
           return res.status(400).json({ message: 'Erro ao buscar usuario' });
       }
   };

   async listId(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const listId = await prisma.users.findUnique({
            where: { id },
        });
            return res.status(200).json(listId);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar usuario' });
        }
   };

   async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, contact, zipcode, adress, password } = req.body;

    try {
        const listId = await prisma.users.update({
            where: { id },
            data: {
                name, email, contact, zipcode, adress, password 
            },
        });
            return res.status(200).json({ message:'Usuario atualizado com sucesso!' });
        } catch {
            return res.status(400).json({ message: ' Erro ao atualizar usuario' });
        }
   };

   async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const deleteUser = await prisma.users.delete({
            where: { id },
        });
        return res.status(200).json({message: `Usuario ${deleteUser} deletado com sucesso`});
    } catch (error) {
        return res.status(400).json({message:'Erro ao deletar usuario'});
    }
   };
};