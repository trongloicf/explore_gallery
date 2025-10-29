"use client";
import { useEffect, useState } from "react";
import GalleryCard from "./GalleryCard";
import GalleryHeader from "./GalleryHeader";
import { getAll } from "@/services/api";
import { GalleryItem } from "@/interfaces/gallery";

export default function GalleryPage() {
    const [gallerys, setGallerys] = useState<GalleryItem[]>([])
    const [filtered, setFiltered] = useState<GalleryItem[]>([]);

    const fetchData = async () => {
        try {
            const res = await getAll()
            setGallerys(res.data)
            setFiltered(res.data);
        } catch (er) {
            console.log(er)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleFilterChange = (filter: { category?: string; sort?: string }) => {
        let data = [...gallerys];

        if (filter.category) {
            data = data.filter((item) => item.category === filter.category);
        }

        switch (filter.sort) {
            case "Mới nhất":
                data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case "Cũ nhất":
                data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            case "Lượt thích (Cao nhất)":
                data.sort((a, b) => b.likes - a.likes);
                break;
            case "Lượt thích (Thấp nhất)":
                data.sort((a, b) => a.likes - b.likes);
                break;
        }

        setFiltered(data);
    };

    const handleSearch = (keyword: string) => {
        const lowerKeyword = keyword.toLowerCase()

        let data = [...gallerys]
        
        data = data.filter((item) => item.title.toLowerCase().includes(lowerKeyword))

        setFiltered(data)
    }

    return (
        <>
            <GalleryHeader 
                onRefresh={fetchData} 
                onFilterChange={handleFilterChange}
                onSearch={handleSearch} 
            />
            <div className="grid grid-cols-4 gap-4 p-4 mt-32">
                {
                    filtered.length > 0 ? (
                        filtered.map((gallery) => (
                            <GalleryCard key={gallery.id} item={gallery} />
                        ))
                    ) : (
                        <p className="text-gray-500">Không có ảnh phù hợp.</p>
                    )
                }
            </div>
        </>
    )
}