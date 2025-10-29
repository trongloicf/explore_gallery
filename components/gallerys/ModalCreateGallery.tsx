"use client";
import { GalleryItemCreate } from "@/interfaces/gallery";
import { postGallery, getAll } from "@/services/api";
import { FormEvent, useState } from "react";
import { FaXmark } from "react-icons/fa6"

interface ModalCreateGallery {
    onClose: () => void;
    onSuccess: () => void;
}

interface FormData {
    title: string;
    description: string;
    category: string;
    author: string;
    url: string;
    tags: string;
}

const START_FORM_DATA: FormData = {
    title: '',
    description: '',
    category: '',
    author: '',
    url: '',
    tags: '',
}

export default function ModalCreateGallery({onClose, onSuccess}: ModalCreateGallery) {
    const categories = ["Nature", "Food", "Travel", "Abstract", "Art", "Animals", "City"]
    const [formData, setFormData] = useState<FormData>(START_FORM_DATA)
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setSubmitError(null)
        if (!formData.title.trim() || !formData.url.trim() || !formData.category) {
            setSubmitError("Vui lòng nhập đầy đủ Tiêu đề, URL và chọn Danh mục.")
            return
        }
        setIsLoading(true)

        const newPayload: GalleryItemCreate = {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            author: formData.author || 'Anonymous',
            url: formData.url,
            likes: 0, 
            views: 0,
            createdAt: new Date().toISOString(), 
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        };
        try {
            await postGallery(newPayload)
            await getAll()
            onSuccess()
            setFormData(START_FORM_DATA)
            onClose()
        }
        catch (er) {
            console.error("Lỗi khi tạo mới ảnh:", er)
            setSubmitError("Lỗi kết nối API. Vui lòng kiểm tra JSON Server (cổng 4000).")
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-2xl w-full mx-4 transform transition-all ease-in-out duration-300 scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <span className="text-xl font-semibold text-gray-800">Tạo mới</span>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition cursor-pointer">
                        <FaXmark size={24} />
                    </button>
                </div>

                <div className="p-6 gap-6">
                    <div className="mb-4">
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">URL ảnh</label>
                        <input 
                            id="url"
                            value={formData.url}
                            onChange={(e) => setFormData((prev) => ({
                                ...prev,
                                url: e.target.value
                            }))}
                            type="url" 
                            placeholder="URL ảnh..."
                            className="block w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                        <input 
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData((prev) => ({
                                ...prev,
                                title: e.target.value
                            }))}
                            type="text" 
                            placeholder="Tiêu đề ảnh..."
                            className="block w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                        <input 
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData((prev) => ({
                                ...prev,
                                description: e.target.value
                            }))}
                            type="text" 
                            placeholder="Mô tả ảnh..."
                            className="block w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                        <select
                            id="category" 
                            value={formData.category}
                            onChange={(e) => setFormData((prev) => ({
                                ...prev,
                                category: e.target.value
                            }))}
                            className="block w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                        >
                            <option value="">-- Lựa chọn danh mục --</option>
                            {
                                categories.map((cate) => (
                                    <option key={cate} value={cate}>{cate}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Tác giả</label>
                        <input 
                            id="author"
                            value={formData.author}
                            onChange={(e) => setFormData((prev) => ({
                                ...prev,
                                author: e.target.value
                            }))}
                            type="text" 
                            placeholder="Tác giả..."
                            className="block w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                        <input 
                            id="tags"
                            value={formData.tags}
                            onChange={(e) => setFormData((prev) => ({
                                ...prev,
                                tags: e.target.value
                            }))}
                            type="text" 
                            placeholder="City, Night, Lights..."
                            className="block w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    {
                        submitError && 
                        (
                            <p className="text-red-500 text-sm">{submitError}</p>
                        )
                    }

                    <div className="flex justify-end">
                        <button
                            type="submit" 
                            disabled={isLoading}
                            onClick={handleSubmit}
                            className="text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition p-2 cursor-pointer"
                        >
                            { isLoading ? "Đang tạo..." : "Tạo mới" }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}