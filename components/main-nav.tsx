"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export function MainNav({
	className,
	...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
	const pathName = usePathname();
	const params = useParams();

	const routes = [
		{
			href: `/${params.storeId}`,
			label: "Overview",
			active: pathName === `/${params.storeId}`,
		},
		{
			href: `/${params.storeId}/billboards`,
			label: "Billboards",
			active: pathName.includes(`/${params.storeId}/billboards`),
		},
		{
			href: `/${params.storeId}/categories`,
			label: "Categories",
			active: pathName.includes(`/${params.storeId}/categories`),
		},
		{
			href: `/${params.storeId}/sizes`,
			label: "Sizes",
			active: pathName.includes(`/${params.storeId}/sizes`),
		},
		{
			href: `/${params.storeId}/colors`,
			label: "Colors",
			active: pathName.includes(`/${params.storeId}/colors`),
		},
		{
			href: `/${params.storeId}/products`,
			label: "Products",
			active: pathName.includes(`/${params.storeId}/products`),
		},
		{
			href: `/${params.storeId}/orders`,
			label: "Orders",
			active: pathName.includes(`/${params.storeId}/orders`),
		},
		{
			href: `/${params.storeId}/settings`,
			label: "Settings",
			active: pathName.includes(`/${params.storeId}/settings`),
		},
	];
	return (
		<nav
			className={cn(
				"flex items-center space-x-4 lg:space-x-6",
				className
			)}
		>
			{routes.map((route) => (
				<Link
					href={route.href}
					key={route.href}
					className={cn(
						"text-sm font-medium transition-colors hover:text-primary",
						route.active
							? "text-black dark:text-white font-semibold"
							: "text-muted-foreground"
					)}
					{...props}
				>
					{route.label}
				</Link>
			))}
		</nav>
	);
}
