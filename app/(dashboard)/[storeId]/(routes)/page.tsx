import prismadb from "@/lib/prismadb";
import React from "react";

interface DashboardPageProps {
	params: {
		storeId: string;
	};
}

export default async function DashboardPage({ params }: DashboardPageProps) {
	const store = await prismadb.store.findFirst({
		where: {
			id: params.storeId,
		},
	});
	return <div>Active store: {store?.name}</div>;
}
