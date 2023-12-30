import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useCreateCategories() {
	const params = useParams();
	const router = useRouter();

	const { mutate: createCategory, isPending: isCreating } = useMutation({
		mutationFn: async (data: { name: string; billboardId: string }) => {
			return await axios.post(`/api/${params.storeId}/categories`, data);
		},
		onError: () => {
			toast.error("Cannot create category");
		},
		onSuccess: () => {
			router.push(`/${params.storeId}/categories`);
			router.refresh();
		},
	});
	return { createCategory, isCreating };
}
