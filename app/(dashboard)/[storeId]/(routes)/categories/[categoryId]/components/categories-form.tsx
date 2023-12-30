"use client";
import React, { Suspense, useState } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import AlertModal from "@/components/modals/alert-modal";
import { Billboard, Category } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useCreateCategories } from "@/features/categories/use-create-categories";
import { useEditCategories } from "@/features/categories/use-edit-categories";
import { useDeleteCategories } from "@/features/categories/use-delete-categories";

const formSchema = z.object({
	name: z.string().min(1),
	billboardId: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
	initialData: Category | null;
	billboards: Billboard[];
}

export default function CategoryForm({
	initialData,
	billboards,
}: CategoryFormProps) {
	const params = useParams();
	const [open, setOpen] = useState(false);

	const { createCategory, isCreating } = useCreateCategories();
	const { editCategories, isEditing } = useEditCategories();
	const { deleteCategories, isDeleting } = useDeleteCategories();

	const isLoading = isCreating || isEditing || isDeleting;

	const title = initialData ? "Edit cateogory" : "Create cateogory";
	const description = initialData ? "Edit a Category" : "Add a new Category";
	const toastMessage = initialData ? "Category updated" : "Category created";
	const action = initialData ? "Save changes" : "Create";

	const form = useForm<CategoryFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: "",
			billboardId: "",
		},
	});

	const onSubmit = function (data: CategoryFormValues) {
		if (initialData) {
			editCategories(data);
		} else {
			createCategory(data);
		}
		toast.success(toastMessage);
	};

	const onDelete = () => {
		deleteCategories(params.categoryId as string);
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
						<Trash className="w-4 h-4" />
					</Button>
				)}
			</div>

			<Separator />

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-8"
				>
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
											placeholder="Category name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="billboardId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Billboard</FormLabel>
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
														placeholder="Select a billboard"
													/>
												</SelectTrigger>
											</FormControl>

											<SelectContent>
												{billboards.map((billboard) => (
													<SelectItem
														key={billboard.id}
														value={billboard.id}
													>
														{billboard.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
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
