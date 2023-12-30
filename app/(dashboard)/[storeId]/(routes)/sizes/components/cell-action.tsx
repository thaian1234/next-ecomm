"use client";
import React from "react";
import toast from "react-hot-toast";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

import { SizeColumn } from "./columns";
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
import { useStoreModal } from "@/hooks/use-store-modal";
import { Separator } from "@/components/ui/separator";
import { useDeleteSizes } from "@/features/sizes/use-delete-sizes";

interface CellActionProps {
	data: SizeColumn;
}

export function CellAction({ data }: CellActionProps) {
	const router = useRouter();
	const params = useParams();
	const { deleteSizes, isDeleting } = useDeleteSizes();

	// const [isOpen, setIsOpen] = useState(false);
	const { isOpen, onClose, onOpen } = useStoreModal((state) => state);

	function onCopy(id: string) {
		navigator.clipboard.writeText(id);
		toast.success("Size ID copied to the clipboard.");
	}
	function onDelete(id: string) {
		deleteSizes(id);
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
								`/${params.storeId}/sizes/${data.id}`
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
