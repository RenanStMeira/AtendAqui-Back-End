import { Request, Response } from "express";
import prisma from "../Services/prismaService";

export  class ServiceController{
    async create(req: Request, res: Response) {
        const { name, typeservice} = req.body;

        try {
            const newService = await prisma.services.create({
                data: {
                    name, 
                    typeservice
                },
            });
            
            return res.status(200).json({ message: `Serviço ${newService} criado com sucesso !` });
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao criar Serviço' })
        }
    };

   async findAll(req: Request, res: Response) {
       const { id } = req.params;

       try {
           const services = await prisma.services.findMany({
               where: { id },
           });

           return res.status(200).json(services);
       } catch (error) {
           return res.status(400).json({ message: 'Erro ao buscar serviço' });
       }
   };

   async listId(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const listId = await prisma.services.findUnique({
            where: { id },
        });
            return res.status(200).json(listId);
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar serviço' });
        }
   };

   async updateService(req: Request, res: Response) {
    const { id } = req.params;
    const { name, typeservice} = req.body;

    try {
        const listId = await prisma.services.update({
            where: { id },
            data: {
                name: name, 
                typeservice: typeservice, 
            },
        });
            return res.status(200).json({ message:'Serviço atualizado com sucesso!' });
        } catch {
            return res.status(400).json({ message: ' Erro ao atualizar serviço' });
        }
   };

   async deleteService(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const services = await prisma.provider.delete({
            where: { id },
        });
        return res.status(200).json({message: `Provider ${services} deletado com sucesso`});
    } catch (error) {
        return res.status(400).json({message:'Erro ao deletar Provider'});
    }
   };
};