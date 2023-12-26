"use client";
import React, { useState } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import AlertModal from "@/components/modals/alert-modal";
import ApiAlert from "@/components/ui/api-alert";
import { Store } from "@prisma/client";
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
import { useEditStore } from "@/features/stores/use-edit-stores";
import { useDeleteStore } from "@/features/stores/use-delete-stores";

interface SettingsFormProps {
	initialData: Store;
}

const formSchema = z.object({
	name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export default function SettingsForm({ initialData }: SettingsFormProps) {
	const params = useParams();
	const origin = useOrigin();
	const { editStore, isEditing } = useEditStore();
	const { deleteStore, isDeleting } = useDeleteStore();
	const [open, setOpen] = useState(false);

	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	});

	const onSubmit = function (data: SettingsFormValues) {
		editStore(data);
	};

	const onDelete = () => {
		deleteStore();
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				isLoading={isEditing || isDeleting}
			/>
			<div className="flex items-center justify-between">
				<Heading
					title="Settings"
					description="Manage store preferences"
				/>
				<Button
					variant="destructive"
					size="sm"
					onClick={() => setOpen(true)}
					disabled={isEditing || isDeleting}
				>
					<Trash className="w-4 h-4" />
				</Button>
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
											disabled={isEditing || isDeleting}
											placeholder="Store name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						disabled={isEditing}
						className="ml-auto"
						type="submit"
					>
						Save changes
					</Button>
				</form>
			</Form>
			<Separator />
			<ApiAlert
				title="NEXT_PUBLIC_API_URL"
				description={`${origin}/api/${params.storeId}`}
				variant="public"
			/>
		</>
	);
}
