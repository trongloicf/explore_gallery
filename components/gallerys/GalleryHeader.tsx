    "use client"
    import { useState } from "react";
    import GalleryFilter from "./GalleryFilter";
    import ModalCreateGallery from "./ModalCreateGallery";

    interface GalleryHeaderProps {
        onRefresh: () => void;
        onFilterChange: (filter: { category?: string; sort?: string }) => void;
        onSearch: (keyword: string) => void;
    }

    export default function GalleryHeader({ onRefresh, onFilterChange, onSearch }: GalleryHeaderProps) {
        const [isOpen, setIsOpen] = useState(false)
        const [search, setSearch] = useState<string>("")

        return (
            <div className="w-full top-0 left-0 right-0 fixed bg-cyan-50 z-20">
                <div className="flex flex-row w-full p-4 justify-between items-center">
                    <span className="uppercase font-medium text-blue-600">Explore Gallery</span>
                    <div className="relative flex-1 mr-4 ml-4">
                        <input 
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                onSearch(e.target.value);
                            }}
                            type="text" 
                            className="w-full h-10 pl-3 pr-24 border border-gray-300 rounded-lg focus:outline-none italic" 
                            placeholder="Tìm kiếm hình ảnh..."
                        />
                        <button
                            onClick={() => onSearch(search)} 
                            className="absolute right-0 top-0 bottom-0 px-4 text-white bg-blue-500 rounded-r-lg hover:bg-blue-700 transition duration-150 cursor-pointer">Tìm kiếm</button>
                    </div>
                    <button 
                        className="text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition p-2 cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    >
                        Tạo mới
                    </button>
                </div>
                <GalleryFilter onFilterChange={onFilterChange} />

                {
                    isOpen &&
                    (
                        <ModalCreateGallery 
                            onClose={() => setIsOpen(false)}
                            onSuccess={() => {
                                onRefresh();
                                setIsOpen(false)
                            }}
                        />
                    )
                }

            </div>
        )
    }