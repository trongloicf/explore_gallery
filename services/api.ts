import { GalleryItemCreate } from "@/interfaces/gallery";
import axios from "axios";

const API = "http://localhost:4000/gallerys"

export const getAll = () => axios.get(`${API}`)
export const getGalleryById = (id: number) => axios.get(`${API}/${id}`)
export const postGallery = (data: GalleryItemCreate) => axios.post(`${API}`, data)