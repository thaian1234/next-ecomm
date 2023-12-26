import React, { Suspense } from "react";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SettingsForm from "./components/settings-form";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonPage from "@/components/skeleton-page";

interface SettingPageProps {
	params: {
		storeId: string;
	};
}

export default async function SettingPage({ params }: SettingPageProps) {
	const { userId } = auth();

	if (!userId) redirect("/sign-in");

	const store = await prismadb.store.findFirst({
		where: {
			userId,
			id: params.storeId,
		},
	});

	if (!store) redirect("/");

	return (
		<div className="flex-col">
			<div className="flex-1 p-8 pt-6 space-y-4">
				<SettingsForm initialData={store} />
			</div>
		</div>
	);
}
