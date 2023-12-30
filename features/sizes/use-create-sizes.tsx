import axios from "axios";
import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export function useCreateSizes() {
	const params = useParams();
	const router = useRouter();

	const { mutate: createSizes, isPending: isCreating, isSuccess } = useMutation({
		mutationFn: async (data: { name: string; value: string }) => {
			return await axios.post(`/api/${params.storeId}/sizes`, data);
		},
		onError: () => {
			toast.error("Cannot create size");
		},
		onSuccess: () => {
			router.push(`/${params.storeId}/sizes`);
			router.refresh();
		},
	});
	return { createSizes, isCreating, isSuccess };
}
