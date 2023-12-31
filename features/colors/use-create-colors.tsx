import axios from "axios";
import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export function useCreateColors() {
	const params = useParams();
	const router = useRouter();

	const { mutate: createColors, isPending: isCreating } = useMutation({
		mutationFn: async (data: { name: string; value: string }) => {
			return await axios.post(`/api/${params.storeId}/colors`, data);
		},
		onError: () => {
			toast.error("Cannot create color");
		},
		onSuccess: () => {
			router.push(`/${params.storeId}/colors`);
			router.refresh();
		},
	});
	return { createColors, isCreating };
}
