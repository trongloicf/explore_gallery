import { GalleryItem } from "@/interfaces/gallery"
import { FaXmark } from "react-icons/fa6"

interface ModalGalleryProps {
    item: GalleryItem;
    onClose: () => void;
}

export default function ModalGallery({ item, onClose }: ModalGalleryProps) {
    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl w-full mx-4 transform transition-all ease-in-out duration-300 scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <span className="text-xl font-semibold text-gray-800">{item.title}</span>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition cursor-pointer">
                        <FaXmark size={24} />
                    </button>
                </div>

                <div className="p-6 flex flex-row gap-6">
                    <div className="flex-1">
                        <img 
                            src={item.url} 
                            alt={item.title} 
                            className="w-full max-h-96 object-contain rounded-lg shadow-md"
                        />
                    </div>
                    
                    <div className="w-64 space-y-3">
                        <p className="text-sm text-gray-700"><strong>Tác giả:</strong> {item.author}</p>
                        <p className="text-sm text-gray-700"><strong>Danh mục:</strong> {item.category}</p>
                        <p className="text-sm text-gray-700"><strong>Lượt thích:</strong> {item.likes}</p>
                        <p className="text-sm text-gray-700"><strong>Lượt xem:</strong> {item.views}</p>
                        <p className="text-sm text-gray-700"><strong>Mô tả:</strong> {item.description}</p>
                        <p className="text-sm text-gray-700"><strong>Tags:</strong> 
                            {item.tags.map(tag => (
                                <span key={tag} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full mr-1">{tag}</span>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}