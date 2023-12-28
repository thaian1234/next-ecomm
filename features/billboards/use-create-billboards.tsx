import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export function useCreateBillboards() {
	const params = useParams();

	const { mutate: createBillboard, isPending: isCreating } = useMutation({
		mutationFn: async (data: { imageUrl: string; label: string }) => {
			return await axios.post(`/api/${params.storeId}/billboards`, data);
		},
		onError: () => {
			toast.error("Cannot create billboard");
		},
	});
	return { createBillboard, isCreating };
}
