import MessageService from '../services/message.service'
import { Request, Response } from 'express';

class MessageController {
    service: any;
    
    constructor() {
        this.service  = MessageService;
    }

    public getMessages = async ( req: Request, res: Response ) : Promise<any> => {
        let messages = await this.service.getMessages()

        return res.send({
            'data': messages
        })
    }

    public getMessage = async ( req: Request, res: Response ) : Promise<any> => {
        let message = await this.service.getMessage(req.params.id)

        return res.send(message)
    }

    public createMessage = async ( req: Request, res: Response ) : Promise<any> => {
        let message = await this.service.createMessage(req.body)

        return res.send(message)
    }

    public updateMessage = async ( req: Request, res: Response ) : Promise<any> => {
        let id = req.params.id
        let message = await this.service.updateMessage(id, req.body)

        return res.send(message)
    }

    public deleteMessage = async ( req: Request, res: Response ) : Promise<any> => {
        let message = await this.service.deleteMessage(req.params.id)

        if ( !message )
            return res.status(404).send("The message with the given ID was not found.");

        return res.send(message)
    }   
}

export default new MessageController();