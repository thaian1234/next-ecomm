"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ProductColumn = {
	id: string;
	name: string;
	price: string;
	size: string;
	category: string;
	color: string;
	isFeatured: boolean;
	isArchived: boolean;
	createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
	{
		accessorKey: "name",
		header: () => <p className="font-bold">Name</p>,
	},
	{
		accessorKey: "isArchived",
		header: () => <p className="font-bold">Archived</p>,
	},
	{
		accessorKey: "isFeatured",
		header: () => <p className="font-bold">Featured</p>,
	},
	{
		accessorKey: "price",
		header: () => <p className="font-bold">Price</p>,
	},
	{
		accessorKey: "category",
		header: () => <p className="font-bold">Category</p>,
	},
	{
		accessorKey: "size",
		header: () => <p className="font-bold">Size</p>,
	},
	{
		accessorKey: "color",
		header: () => <p className="font-bold">Color</p>,
		cell: ({ row }) => (
			<div className="flex items-center gap-x-2">
				{row.original.color}
				<div
					className="size-6 rounded-full border"
					style={{ backgroundColor: row.original.color }}
				/>
			</div>
		),
	},
	{
		accessorKey: "createdAt",
		header: () => <p className="font-bold">Date</p>,
	},
	{
		id: "action",
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
