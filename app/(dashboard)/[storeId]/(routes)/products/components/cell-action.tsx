"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

import { ProductColumn } from "./columns";
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
import { Separator } from "@/components/ui/separator";
import { useDeleteProducts } from "@/features/products/use-delete-products";

interface CellActionProps {
	data: ProductColumn;
}

export function CellAction({ data }: CellActionProps) {
	const router = useRouter();
	const params = useParams();
	const { deleteProducts, isDeleting } = useDeleteProducts();

	const [isOpen, setIsOpen] = useState(false);

	function onCopy(id: string) {
		navigator.clipboard.writeText(id);
		toast.success("Product ID copied to the clipboard.");
	}
	function onDelete(id: string) {
		deleteProducts(id);
		setIsOpen(false);
	}

	return (
		<>
			<AlertModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
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
								`/${params.storeId}/products/${data.id}`
							)
						}
						disabled={isDeleting}
					>
						<Edit className="mr-2 size-4" />
						Update
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => setIsOpen(true)}
						disabled={isDeleting}
					>
						<Trash className="mr-2 size-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
