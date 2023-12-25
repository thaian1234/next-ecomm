"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	isLoading: boolean;
}
export default function AlertModal({
	isOpen,
	onClose,
	onConfirm,
	isLoading,
}: AlertModalProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<Modal
			title="Are you sure ?"
			description="This action cannot be undone"
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="flex items-center justify-end w-full pt-6 space-x-2">
				<Button
					disabled={isLoading}
					variant="outline"
					onClick={onClose}
				>
					Cancel
				</Button>

				<Button
					disabled={isLoading}
					variant="destructive"
					onClick={onConfirm}
				>
					Continue
				</Button>
			</div>
		</Modal>
	);
}
