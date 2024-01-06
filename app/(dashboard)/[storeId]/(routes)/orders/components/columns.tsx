"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
	id: string;
	phone: string;
	address: string;
	isPaid: boolean;
	totalPrice: string;
	products: string;
	createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
	{
		accessorKey: "products",
		header: () => <p className="font-bold">Products</p>,
	},
	{
		accessorKey: "phone",
		header: () => <p className="font-bold">Phone</p>,
	},
	{
		accessorKey: "address",
		header: () => <p className="font-bold">Address</p>,
	},
	{
		accessorKey: "totalPrice",
		header: () => <p className="font-bold">Total</p>,
	},
	{
		accessorKey: "isPaid",
		header: () => <p className="font-bold">Paid</p>,
	},
	{
		accessorKey: "createdAt",
		header: () => <p className="font-bold">Date</p>,
	},
];
