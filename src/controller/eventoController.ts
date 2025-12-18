// controller/eventoController.ts
import { Request, Response } from 'express';
import {
  createEvento,
  getAllEventos,
  getEventoById,
  updateEvento,
  deleteEvento,
  joinEvento,
  leaveEvento
} from '../services/eventoServices';

export async function createEventoHandler(req: Request, res: Response): Promise<Response> {
  console.log('crear evento');
  try {
    const data = await createEvento(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}

export async function getAlleventoHandler(req: Request, res: Response): Promise<Response> {
  console.log('obtener todos los eventos');
  try {
    const data = await getAllEventos();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}

export async function getEventoByIdHandler(req: Request, res: Response): Promise<Response> {
  console.log('obtener evento por id');
  try {
    const { id } = req.params;
    const data = await getEventoById(id);
    if (!data) {
      return res.status(404).json({ message: 'EVENTO NO ENCONTRADO' });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}

export async function updateEventoHandler(req: Request, res: Response): Promise<Response> {
  console.log('actualizar evento por id');
  try {
    const { id } = req.params;
    const data = await updateEvento(id, req.body);
    if (!data) {
      return res.status(404).json({ message: 'EVENTO NO ENCONTRADO' });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}

export async function deleteEventoHandler(req: Request, res: Response): Promise<Response> {
  console.log('eliminar evento por id');
  try {
    const { id } = req.params;
    console.log('ID recibido para eliminar:', id);
    const data = await deleteEvento(id);
    if (!data) {
      return res.status(404).json({ message: 'EVENTO NO ENCONTRADO' });
    }
    return res.status(200).json({
      message: 'EVENTO ELIMINADO CON ÉXITO',
      deletedEvento: data
    });
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}

export async function joinEventoHandler(req: Request, res: Response): Promise<Response> {
  console.log('inscribirse a evento');
  try {
    console.log('Usuario autenticado:', (req as any).user);
    
    const eventoId = req.params.id;
    const userId = (req as any).user?.payload?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Usuario no identificado en el token' });
    }
    
    console.log('EventoId:', eventoId, 'UserId:', userId);
    
    const evento = await joinEvento(eventoId, userId);
    return res.status(200).json({
      message: 'Te has inscrito al evento exitosamente',
      evento
    });
  } catch (error) {
    console.error('Error en joinEventoHandler:', error);
    return res.status(400).json({ message: (error as Error).message });
  }
}

export async function leaveEventoHandler(req: Request, res: Response): Promise<Response> {
  console.log('desinscribirse de evento');
  try {
    console.log('Usuario autenticado:', (req as any).user);
    
    const eventoId = req.params.id;
    const userId = (req as any).user?.payload?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Usuario no identificado en el token' });
    }
    
    console.log('EventoId:', eventoId, 'UserId:', userId);
    
    const evento = await leaveEvento(eventoId, userId);
    return res.status(200).json({
      message: 'Te has desinscrito del evento exitosamente',
      evento
    });
  } catch (error) {
    console.error('Error en leaveEventoHandler:', error);
    return res.status(400).json({ message: (error as Error).message });
  }
}