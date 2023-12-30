import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export const useEditSizes = () => {
	const router = useRouter();
	const params = useParams();

	const { mutate: editSizes, isPending: isEditing, isSuccess } = useMutation({
		mutationFn: async (data: { name: string; value: string }) => {
			return await axios.patch(
				`/api/${params.storeId}/sizes/${params.sizeId}`,
				data
			);
		},
		onError: () => {
			toast.error("Cannot edit sizes");
		},
		onSuccess: () => {
			router.push(`/${params.storeId}/sizes`);
			router.refresh();
		},
	});

	return { editSizes, isEditing, isSuccess };
};
