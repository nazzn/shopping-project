import React, { useEffect, useState } from 'react';
import { HttpService } from '../../serviss/httpservice';

type PaginatedItemProps = {
    children: React.ReactNode
}

interface Product {
    id: string,
    title: string,
    categoryTitle:string,
    realPrice:number,
    salesPrice: number,
    qty: number,
    createdAt: string
  }
const PaginatedItems: React.FC<PaginatedItemProps> = ( {children} : PaginatedItemProps) => {
    const [items, setItems] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await HttpService.get(`/api/products?page=${currentPage}`);
                setItems(response.data);
                setTotalItems(response.data.totalCount); // Adjust based on your API response structure
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [currentPage]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        console.log(items);
    }, [items])
    
    return (
        <div>
            <ul>
                {items?.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    disabled={currentPage === index + 1}
                    aria-label={`Go to page ${index + 1}`}
                >
                    {index + 1}
                    </button>
                ))}
            </div>
            {children}
        </div>
    );
};

export default PaginatedItems;