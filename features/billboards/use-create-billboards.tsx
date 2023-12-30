import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useCreateBillboards() {
	const params = useParams();
	const router = useRouter();

	const { mutate: createBillboard, isPending: isCreating } = useMutation({
		mutationFn: async (data: { imageUrl: string; label: string }) => {
			return await axios.post(`/api/${params.storeId}/billboards`, data);
		},
		onError: () => {
			toast.error("Cannot create billboard");
		},
		onSuccess: () => {
			router.push(`/${params.storeId}/billboards`);
			router.refresh();
		},
	});
	return { createBillboard, isCreating };
}
