"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type BillboardColumn = {
	id: string;
	label: string;
	createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
	{
		accessorKey: "label",
		header: () => <p className="font-bold">Label</p>,
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
