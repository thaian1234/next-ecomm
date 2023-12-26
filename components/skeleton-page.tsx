import React, { FC } from "react";
import { Skeleton } from "./ui/skeleton";

const SkeletonPage = () => {
	return (
		<div className="flex items-center justify-center h-full space-x-4">
			<Skeleton className="w-48 h-48 rounded-full" />
			<div className="space-y-2">
				<Skeleton className="w-[500px] h-16" />
				<Skeleton className="w-[500px] h-16 " />
			</div>
		</div>
	);
};

export default SkeletonPage;
