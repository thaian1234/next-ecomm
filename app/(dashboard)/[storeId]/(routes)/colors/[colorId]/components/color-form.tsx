"use client";
import React, { useState } from "react";
import * as z from "zod";
import toast from "react-hot-toast";
import AlertModal from "@/components/modals/alert-modal";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Color } from "@prisma/client";
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
import { useCreateColors } from "@/features/colors/use-create-colors";
import { useEditColors } from "@/features/colors/use-edit-colors";
import { useDeleteColors } from "@/features/colors/use-delete-colors";

const formSchema = z.object({
	name: z.string().min(1),
	value: z.string().min(1),
});

type ColorFormValues = z.infer<typeof formSchema>;

interface ColorFormProps {
	initialData: Color | null;
}

export default function ColorForm({ initialData }: ColorFormProps) {
	const params = useParams();
	const [open, setOpen] = useState(false);

	const { createColors, isCreating } = useCreateColors();
	const { editColors, isEditing } = useEditColors();
	const { deleteColors, isDeleting } = useDeleteColors();

	const isLoading = isCreating || isEditing || isDeleting;

	const title = initialData ? "Edit Color" : "Create Color";
	const description = initialData ? "Edit a Color" : "Add a new Color";
	const toastMessage = initialData ? "Color updated" : "Color created";
	const action = initialData ? "Save changes" : "Create";

	const form = useForm<ColorFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: "",
			value: "",
		},
	});

	const onSubmit = function (data: ColorFormValues) {
		if (initialData) {
			editColors(data, {
				onSuccess: () => {
					toast.success(toastMessage);
				},
			});
		} else {
			createColors(data, {
				onSuccess: () => {
					toast.success(toastMessage);
				},
			});
		}
	};

	const onDelete = () => {
		deleteColors(params.colorId as string);
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
											placeholder="Color name"
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
										<div className="flex items-center gap-x-4">
											<Input
												disabled={isLoading}
												placeholder="Color value"
												{...field}
											/>
											<div
												className="border-4 p-4 rounded-full"
												style={{
													backgroundColor:
														field.value,
												}}
											/>
										</div>
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
