"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ColorColumn = {
	id: string;
	name: string;
	value: string;
	createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
	{
		accessorKey: "name",
		header: () => <p className="font-bold">Name</p>,
	},
	{
		accessorKey: "value",
		header: () => <p className="font-bold">Value</p>,
		cell: ({ row }) => (
			<div className="flex items-center gap-x-2">
				{row.original.value}
				<div
					className="border rounded-full size-6"
					style={{ backgroundColor: row.original.value }}
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
