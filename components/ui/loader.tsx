"use client";
import { ClipLoader } from "react-spinners";

export const Loader = () => {
	return (
		<div className="flex items-center justify-center h-full w-dvw">
			<ClipLoader color="#3498db" size={100} />
		</div>
	);
};
