import { Suspense } from "react";
import prismadb from "@/lib/prismadb";
import SkeletonPage from "@/components/skeleton-page";
import CategoryForm from "./components/categories-form";

export default async function CategoryPage({
	params,
}: {
	params: {
		categoryId: string;
		storeId: string;
	};
}) {
	const category = await prismadb.category.findUnique({
		where: {
			id: params.categoryId,
		},
	});

	const billboards = await prismadb.billboard.findMany({
		where: {
			storeId: params.storeId,
		},
	});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<Suspense fallback={<SkeletonPage />}>
					<CategoryForm
						billboards={billboards}
						initialData={category}
					/>
				</Suspense>
			</div>
		</div>
	);
}
