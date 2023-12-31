import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";

const BillboardsPage = async ({
	params,
}: {
	params: {
		storeId: string;
	};
}) => {
	const billboards = await prismadb.billboard.findMany({
		where: {
			storeId: params.storeId,
		},

		orderBy: {
			createdAt: "desc",
		},
	});

	const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
		id: item.id,
		label: item.label,
		createdAt: format(item.createdAt, "MMMM do, yyyy"),
	}));

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<Suspense fallback={<Loader />}>
					<BillboardClient data={formattedBillboards} />
				</Suspense>
			</div>
		</div>
	);
};

export default BillboardsPage;
