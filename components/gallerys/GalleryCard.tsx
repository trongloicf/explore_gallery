"use client";
import { GalleryItem } from "@/interfaces/gallery";
import { useState } from "react"
import { FaHeart, FaEye } from 'react-icons/fa'; 
import ModalGallery from "./ModalGallery";

interface GalleryCardProps {
    item: GalleryItem;
}

export default function GalleryCard({ item }: GalleryCardProps) {
    const [isHover, setIsHover] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    
    const overlayClasses = `
        absolute inset-x-0 bottom-0 z-2 text-white p-3 flex justify-between items-center
        bg-black bg-opacity-50 transition-transform duration-500 ease-in-out
        ${isHover ? 'translate-y-0' : 'translate-y-full'} 
    `;

    return (
        <>
            <div 
                className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg group"
                onClick={() => setIsOpen(true)}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover aspect-square transition duration-500 group-hover:scale-105"
                />
                
                <div 
                    className={overlayClasses}
                >
                    <span className="font-semibold truncate">{item.title}</span>
                    
                    <div className="flex items-center space-x-3 text-sm">
                        <div className="flex items-center gap-1">
                            <FaHeart className="text-white-400" size={14} />
                            <span>{item.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaEye className="text-white" size={14} />
                            <span>{item.views}</span>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <ModalGallery 
                    item={item}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}