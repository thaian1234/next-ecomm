"use client";
import React, { useState } from "react";
import * as z from "zod";
import toast from "react-hot-toast";
import AlertModal from "@/components/modals/alert-modal";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Size } from "@prisma/client";
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
import { useParams } from "next/navigation";
import { useCreateSizes } from "@/features/sizes/use-create-sizes";
import { useEditSizes } from "@/features/sizes/use-edit-sizes";
import { useDeleteSizes } from "@/features/sizes/use-delete-sizes";

const formSchema = z.object({
	name: z.string().min(1),
	value: z.string().min(1),
});

type SizeFormValues = z.infer<typeof formSchema>;

interface SizeFormProps {
	initialData: Size | null;
}

export default function SizeForm({ initialData }: SizeFormProps) {
	const params = useParams();
	const [open, setOpen] = useState(false);

	const {
		createSizes,
		isCreating,
		isSuccess: isSuccessCreated,
	} = useCreateSizes();
	const { editSizes, isEditing, isSuccess: isSuccessEdited } = useEditSizes();
	const { deleteSizes, isDeleting } = useDeleteSizes();

	const isLoading = isCreating || isEditing || isDeleting;

	const title = initialData ? "Edit Size" : "Create Size";
	const description = initialData ? "Edit a Size" : "Add a new Size";
	const toastMessage = initialData ? "Size updated" : "Size created";
	const action = initialData ? "Save changes" : "Create";

	const form = useForm<SizeFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: "",
			value: "",
		},
	});

	const onSubmit = function (data: SizeFormValues) {
		if (initialData) {
			editSizes(data, {
				onSuccess: () => {
					toast.success(toastMessage);
				},
			});
		} else {
			createSizes(data, {
				onSuccess: () => {
					toast.success(toastMessage);
				},
			});
		}
	};

	const onDelete = () => {
		deleteSizes(params.sizeId as string);
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
											placeholder="Size name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="value"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Value</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="Size value"
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
