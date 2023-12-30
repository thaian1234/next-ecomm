"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

import { BillboardColumn } from "./columns";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/modals/alert-modal";
import { useParams, useRouter } from "next/navigation";
import { useDeleteBillboards } from "@/features/billboards/use-delete-billboards";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Separator } from "@/components/ui/separator";

interface CellActionProps {
	data: BillboardColumn;
}

export function CellAction({ data }: CellActionProps) {
	const router = useRouter();
	const params = useParams();
	const { deleteBillboards, isDeleting } = useDeleteBillboards();

	// const [isOpen, setIsOpen] = useState(false);
	const { isOpen, onClose, onOpen } = useStoreModal((state) => state);

	function onCopy(id: string) {
		navigator.clipboard.writeText(id);
		toast.success("Billboard ID copied to the clipboard.");
	}
	function onDelete(id: string) {
		deleteBillboards(id);
		// setIsOpen(false);
		onClose();
	}

	return (
		<>
			<AlertModal
				isOpen={isOpen}
				onClose={onClose}
				onConfirm={() => onDelete(data.id)}
				isLoading={isDeleting}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="p-0 size-8">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start" aria-disabled={isDeleting}>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<Separator />
					<DropdownMenuItem
						onClick={() => onCopy(data.id)}
						disabled={isDeleting}
					>
						<Copy className="mr-2 size-4" />
						Copy ID
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() =>
							router.push(
								`/${params.storeId}/billboards/${data.id}`
							)
						}
						disabled={isDeleting}
					>
						<Edit className="mr-2 size-4" />
						Update
					</DropdownMenuItem>
					<DropdownMenuItem onClick={onOpen} disabled={isDeleting}>
						<Trash className="mr-2 size-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
