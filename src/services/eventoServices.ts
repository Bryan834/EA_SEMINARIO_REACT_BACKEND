import mongoose from 'mongoose';
import Evento, { IEvento } from '../models/evento';

export const createEvento = async (data: IEvento) => {
  const ev = new Evento(data);
  return await ev.save();
};
/*
export const getAllEventos = async () => {
  return await Evento.find().sort({ createdAt: -1 });
};
*/

//getAllEventos
export const getAllEventos = async () => {
  return await Evento.find();
};


export const getEventoById = async (id: string) => {
  return await Evento.findById(id);
};

export const updateEvento = async (id: string, data: Partial<IEvento>) => {
  return await Evento.findByIdAndUpdate(id, data, { new: true });
}

export const deleteEvento = async (id: string) => {
  return await Evento.deleteOne({ _id: id });
};

export const joinEvento = async (eventoId: string, userId: string) => {
  const evento = await Evento.findById(eventoId);
  if (!evento) {
    throw new Error('Evento no encontrado');
  }

  const userObjectId = new mongoose.Types.ObjectId(userId);
  
  // Verificar si ya está inscrito
  const alreadyJoined = evento.participants?.some(
    (participant) => participant.toString() === userId
  );

  if (alreadyJoined) {
    throw new Error('Ya estás inscrito en este evento');
  }

  evento.participants = evento.participants || [];
  evento.participants.push(userObjectId);
  
  return await evento.save();
};

export const leaveEvento = async (eventoId: string, userId: string) => {
  const evento = await Evento.findById(eventoId);
  if (!evento) {
    throw new Error('Evento no encontrado');
  }

  // Verificar si está inscrito
  const isJoined = evento.participants?.some(
    (participant) => participant.toString() === userId
  );

  if (!isJoined) {
    throw new Error('No estás inscrito en este evento');
  }

  evento.participants = evento.participants?.filter(
    (participant) => participant.toString() !== userId
  ) || [];
  
  return await evento.save();
};