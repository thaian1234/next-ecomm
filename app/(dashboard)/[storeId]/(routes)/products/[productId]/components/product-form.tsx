"use client";
import React, { useState } from "react";
import * as z from "zod";
import { Category, Color, Image, Product, Size } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import AlertModal from "@/components/modals/alert-modal";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import ImageUpload from "@/components/ui/image-upload";
import toast from "react-hot-toast";
import { useCreateBillboards } from "@/features/billboards/use-create-billboards";
import { useEditBillboards } from "@/features/billboards/use-edit-billboards";
import { useDeleteBillboards } from "@/features/billboards/use-delete-billboards";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateProducts } from "@/features/products/use-create-products";
import { useEditProducts } from "@/features/products/use-edit-products";
import { useDeleteProducts } from "@/features/products/use-delete-products";

const formSchema = z.object({
	name: z.string().min(1),
	images: z
		.object({
			url: z.string(),
		})
		.array()
		.min(1, "At least 1 image"),
	price: z.coerce.number().min(1),
	categoryId: z.string().min(1),
	colorId: z.string().min(1),
	sizeId: z.string().min(1),
	isFeatured: z.boolean().default(false).optional(),
	isArchived: z.boolean().default(false).optional(),
});

export type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
	initialData:
		| (Product & {
				images: Image[];
		  })
		| null;
	categories: Category[];
	colors: Color[];
	sizes: Size[];
}

export default function ProductForm({
	initialData,
	categories,
	colors,
	sizes,
}: ProductFormProps) {
	const params = useParams();
	const [open, setOpen] = useState(false);

	const { createProducts, isCreating } = useCreateProducts();
	const { editProducts, isEditing } = useEditProducts();
	const { deleteProducts, isDeleting } = useDeleteProducts();

	const isLoading = isCreating || isEditing || isDeleting;

	const title = initialData ? "Edit Product" : "Create Product";
	const description = initialData ? "Edit a Product" : "Add a new Product";
	const toastMessage = initialData ? "Product updated" : "Product created";
	const action = initialData ? "Save changes" : "Create";

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
			? {
					...initialData,
					price: parseFloat(String(initialData?.price)),
			  }
			: {
					name: "",
					images: [],
					price: 0,
					categoryId: "",
					colorId: "",
					sizeId: "",
					isFeatured: false,
					isArchived: false,
			  },
	});

	const onSubmit = function (data: ProductFormValues) {
		if (initialData) {
			editProducts(data, {
				onSuccess: () => {
					toast.success(toastMessage);
				},
			});
		} else {
			createProducts(data, {
				onSuccess: () => {
					toast.success(toastMessage);
				},
			});
		}
	};

	const onDelete = () => {
		deleteProducts(params.productId as string);
		setOpen(true);
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				isLoading={isLoading}
			/>
			<div className="flex items-center justify-between">
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						variant="destructive"
						size="sm"
						onClick={() => setOpen(true)}
						disabled={isLoading}
					>
						<Trash className="size-4" />
					</Button>
				)}
			</div>

			<Separator />

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-8"
				>
					<FormField
						control={form.control}
						name="images"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Images</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value.map(
											(image) => image.url
										)}
										disabled={isLoading}
										onChange={(url) =>
											field.onChange([
												...field.value,
												{
													url,
												},
											])
										}
										onRemove={(url) =>
											field.onChange([
												...field.value.filter(
													(current) =>
														current.url !== url
												),
											])
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="Product name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input
											type="number"
											disabled={isLoading}
											placeholder="9.99"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="categoryId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<Select
											disabled={isLoading}
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														defaultValue={
															field.value
														}
														placeholder="Select a category"
													/>
												</SelectTrigger>
											</FormControl>

											<SelectContent>
												{categories.map((category) => (
													<SelectItem
														key={category.id}
														value={category.id}
													>
														{category.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="sizeId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Size</FormLabel>
									<FormControl>
										<Select
											disabled={isLoading}
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														defaultValue={
															field.value
														}
														placeholder="Select a size"
													/>
												</SelectTrigger>
											</FormControl>

											<SelectContent>
												{sizes.map((size) => (
													<SelectItem
														key={size.id}
														value={size.id}
													>
														{size.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="colorId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Color</FormLabel>
									<FormControl>
										<Select
											disabled={isLoading}
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														defaultValue={
															field.value
														}
														placeholder="Select a color"
													/>
												</SelectTrigger>
											</FormControl>

											<SelectContent>
												{colors.map((color) => (
													<SelectItem
														key={color.id}
														value={color.id}
													>
														{color.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="isFeatured"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start p-4 space-x-3 space-y-4 border rounded-md">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>Featured</FormLabel>
										<FormDescription>
											This proudct will appear on the home
											page
										</FormDescription>
									</div>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="isArchived"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start p-4 space-x-3 space-y-4 border rounded-md">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>Archived</FormLabel>
										<FormDescription>
											This proudct will not appear
											anywhere on the store
										</FormDescription>
									</div>
								</FormItem>
							)}
						/>
					</div>

					<Button
						disabled={isLoading}
						className="ml-auto"
						type="submit"
					>
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
}
