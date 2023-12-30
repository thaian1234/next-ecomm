"use client";
import React, { Suspense, useState } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import AlertModal from "@/components/modals/alert-modal";
import { Billboard } from "@prisma/client";
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
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";
import toast from "react-hot-toast";
import { useCreateBillboards } from "@/features/billboards/use-create-billboards";
import { useEditBillboards } from "@/features/billboards/use-edit-billboards";
import { useDeleteBillboards } from "@/features/billboards/use-delete-billboards";

const formSchema = z.object({
	label: z.string().min(1),
	imageUrl: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
	initialData: Billboard | null;
}

export default function BillboardForm({ initialData }: BillboardFormProps) {
	const params = useParams();
	const [open, setOpen] = useState(false);

	const { createBillboard, isCreating } = useCreateBillboards();
	const { editBillboards, isEditing } = useEditBillboards();
	const { deleteBillboards, isDeleting } = useDeleteBillboards();

	const isLoading = isCreating || isEditing || isDeleting;

	const title = initialData ? "Edit billboard" : "Create billboard";
	const description = initialData
		? "Edit a billboard"
		: "Add a new billboard";
	const toastMessage = initialData
		? "Billboard updated"
		: "Billboard created";
	const action = initialData ? "Save changes" : "Create";

	const form = useForm<BillboardFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			label: "",
			imageUrl: "",
		},
	});

	const onSubmit = function (data: BillboardFormValues) {
		if (initialData) {
			editBillboards(data);
		} else {
			createBillboard(data);
		}
		toast.success(toastMessage);
	};

	const onDelete = () => {
		// try {
		// 	setIsLoading(true);
		// await axios.delete(
		// 	`/api/${params.storeId}/billboards/${params.billboardId}`
		// 	);
		// 	router.refresh();
		// 	toast.success("Billborad deleted");
		// } catch (error) {
		// 	toast.error(
		// 		"Make sure you removed all categories using this billboard first"
		// 	);
		// } finally {
		// 	setIsLoading(false);
		// 	setOpen(true);
		// }
		deleteBillboards(params.billboardId as string);
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
					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Background image</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value ? [field.value] : []}
										disabled={isLoading}
										onChange={(url) => field.onChange(url)}
										onRemove={() => field.onChange("")}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="label"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="Billboard label"
											{...field}
										/>
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
