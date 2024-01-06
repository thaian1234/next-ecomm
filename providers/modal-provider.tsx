"use client";

import { StoreModal } from "@/components/modals/store-modal";
import { useIsClient } from "usehooks-ts";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
	const isClient = useIsClient();
	if (!isClient) return null;
	// const [isMounted, setIsMounted] = useState(false);

	// useEffect(() => {
	// 	setIsMounted(true);
	// }, []);

	// if (!isMounted) return null;

	return (
		<>
			<StoreModal />
		</>
	);
};
