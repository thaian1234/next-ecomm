import { Suspense } from "react";
import prismadb from "@/lib/prismadb";
import SkeletonPage from "@/components/skeleton-page";
import BillboardForm from "./components/billboards-form";

export default async function BillboardPage({
	params,
}: {
	params: {
		billboardId: string;
	};
}) {
	const billboard = await prismadb.billboard.findUnique({
		where: {
			id: params.billboardId,
		},
	});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<Suspense fallback={<SkeletonPage />}>
					<BillboardForm initialData={billboard} />
				</Suspense>
			</div>
		</div>
	);
}
