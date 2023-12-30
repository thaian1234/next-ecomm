"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type SizeColumn = {
	id: string;
	name: string;
	value: string;
	createdAt: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
	{
		accessorKey: "name",
		header: () => <p className="font-bold">Name</p>,
	},
	{
		accessorKey: "value",
		header: () => <p className="font-bold">Value</p>,
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
