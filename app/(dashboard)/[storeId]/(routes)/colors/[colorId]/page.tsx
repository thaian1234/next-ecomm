import { Suspense } from "react";
import prismadb from "@/lib/prismadb";
import SkeletonPage from "@/components/skeleton-page";
import ColorForm from "./components/color-form";

export default async function ColorPage({
	params,
}: {
	params: {
		colorId: string;
	};
}) {
	const color = await prismadb.color.findUnique({
		where: {
			id: params.colorId,
		},
	});

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<Suspense fallback={<SkeletonPage />}>
					<ColorForm initialData={color} />
				</Suspense>
			</div>
		</div>
	);
}
