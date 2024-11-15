"use client";

import { useState, useEffect } from "react";
import { ProductInterface } from "@/app/products/productInterface";
import { Edit, Printer } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SidebarInset } from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/api/product-article");
      const data = await response.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <SidebarInset>
      <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
        <form className="flex items-center gap-3">
          <Label htmlFor="search">SEARCH</Label>
          <Input id="search" className="h-6" />
        </form>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4">
        <ul className="flex flex-1 flex-col gap-2 p-4">
          {products.map((item: ProductInterface, index) => (
            <li
              key={index}
              className="flex gap-3 items-center h-10 w-full  bg-muted/50 rounded p-2 justify-between"
            >
              <div className="flex gap-4 items-center justify-between w-full">
                <p className="text-lg ">{item.articleNumber}</p>
                <p className="text-lg flex-grow">{item.articleName}</p>
                <p className="text-lg">{item.storageLocation}</p>
              </div>
              <Separator
                orientation="vertical"
                className="mr-2 h-full border-2 rounded"
              />
              <div className="flex gap-3 items-center justify-center w-1/6">
                <Printer size={20} />
                <Edit size={20} />
              </div>
            </li>
          ))}
        </ul>
      </main>
    </SidebarInset>
  );
}
