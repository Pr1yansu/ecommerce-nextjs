import React from "react";
import CategoryClient from "./components/Client";
import prisma from "@/lib/prismadb";

import { format } from "date-fns";
import { CategoryColumn } from "./[categoriesId]/components/columns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prisma.category.findMany({
    where: { storeId: params.storeId },
    include: { billboard: true },
    orderBy: { createdAt: "desc" },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => {
    return {
      id: item.id,
      name: item.name,
      billboardLabel: item.billboard.label,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <section className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </section>
  );
};

export default CategoriesPage;
