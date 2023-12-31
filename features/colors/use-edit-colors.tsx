import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export const useEditColors = () => {
	const router = useRouter();
	const params = useParams();

	const { mutate: editColors, isPending: isEditing } = useMutation({
		mutationFn: async (data: { name: string; value: string }) => {
			return await axios.patch(
				`/api/${params.storeId}/colors/${params.colorId}`,
				data
			);
		},
		onError: () => {
			toast.error("Cannot edit Colors");
		},
		onSuccess: () => {
			router.push(`/${params.storeId}/colors`);
			router.refresh();
		},
	});

	return { editColors, isEditing };
};
