"use client";
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { Modal } from "@/components/ui/modal";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useCreateStore } from "@/features/stores/use-create-stores";

const formSchema = z.object({
	name: z.string().min(1),
});

type StoreFormValues = z.infer<typeof formSchema>;

export const StoreModal = () => {
	const storeModal = useStoreModal();
	const { createStore, isCreating: isLoading } = useCreateStore();
	// const [isLoading, setIsLoading] = useState(false);

	const form = useForm<StoreFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = async (values: StoreFormValues) => {
		// try {
		// 	setIsLoading(true);
		// 	const resp = await axios.post("/api/stores", values);

		// 	window.location.assign(`/${resp.data.id}`);
		// } catch (error) {
		// 	toast.error("Something went wrong ❌");
		// } finally {
		// 	setIsLoading(false);
		// }
		createStore(values, {
			onSuccess: ({ data }) => {
				window.location.assign(`/${data.id}`);
			},
		});
	};

	return (
		<Modal
			title="Create store"
			description="Add a new store"
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			<div>
				<div className="py-2 pb-4 space-y-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder="E-Commerce"
												disabled={isLoading}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex items-center justify-end w-full pt-6 space-x-2">
								<Button
									variant="outline"
									onClick={storeModal.onClose}
									disabled={isLoading}
								>
									Cancel
								</Button>
								<Button type="submit" disabled={isLoading}>
									Continue
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	);
};
