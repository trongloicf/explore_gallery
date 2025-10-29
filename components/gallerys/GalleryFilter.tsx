"use client";
import { FaAngleDown } from "react-icons/fa6"
import { getAll } from "@/services/api"
import { useEffect, useState } from "react"

interface GalleryFilterProps {
    onFilterChange: (filter: { category?: string; sort?: string }) => void;
}

export default function GalleryFilter({ onFilterChange }: GalleryFilterProps) {
    const categories = ["Nature", "Food", "Travel", "Abstract", "Art", "Animals", "City"]
    const sorts = ["Mới nhất", "Cũ nhất", "Lượt thích (Cao nhất)", "Lượt thích (Thấp nhất)"]

    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");

     const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setCategory(value);
        onFilterChange({ category: value, sort });
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSort(value);
        onFilterChange({ category, sort: value });
    };

    return (
        <div className="w-full p-4 flex flex-row items-center">
            <div className="flex flex-row items-center gap-2">
                <span>Bộ lọc hình ảnh</span>
                <span className="mr-3 ml-3">|</span>
            </div>
            
            {
                categories ? 
                (
                    <div className="flex flex-row items-center gap-2">
                        <label htmlFor="category" className="text-sm font-medium text-gray-600">Danh mục:</label>
                        <select 
                            id="category"
                            value={category}
                            onChange={handleCategoryChange}
                            className="border border-gray-300 rounded-md py-2 px-3 text-sm bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        >
                            <option value="">-- Tất cả --</option>
                            {categories.map((cate) => (
                                <option key={cate} value={cate}>{cate}</option>
                            ))}
                        </select>
                        <span className="mr-3 ml-3">|</span>
                    </div>    
                ) : (
                    <div></div>
                )
            }

            {
                sorts ? 
                (
                    <div className="flex flex-row items-center gap-2">
                        <label htmlFor="sort" className="text-sm font-medium text-gray-600">Sắp xếp theo:</label>
                        <select 
                            id="sort"
                            value={sort}
                            onChange={handleSortChange}
                            className="border border-gray-300 rounded-md py-2 px-3 text-sm bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        >
                            <option value="">-- Lựa chọn --</option>
                            {sorts.map((sort) => (
                                <option key={sort} value={sort}>{sort}</option>
                            ))}
                        </select>
                        <span className="mr-3 ml-3">|</span>
                    </div> 
                ) : 
                (
                    <div></div>
                )
            }
        </div>
    )
}