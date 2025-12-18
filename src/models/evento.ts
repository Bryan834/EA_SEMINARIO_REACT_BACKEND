import mongoose, { Types } from "mongoose";

const eventoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    schedule: { type: String, required: true, trim: true }, // p.ej. "16:30 - 17:30"
    address: { type: String, trim: true },                  //(Latitud y Longitud, para usar geojson)
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }]

  },
  { timestamps: false, versionKey: false }
);

export interface IEvento {
  _id: Types.ObjectId;
  name: string;
  schedule: string;
  address?: string;
  participants?: Types.ObjectId[];
}

const Evento = mongoose.model('Evento', eventoSchema);
export default Evento;
