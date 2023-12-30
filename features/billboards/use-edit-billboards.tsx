import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export const useEditBillboards = () => {
	const router = useRouter();
	const params = useParams();

	const { mutate: editBillboards, isPending: isEditing } = useMutation({
		mutationFn: async (data: { label: string; imageUrl: string }) => {
			return await axios.patch(
				`/api/${params.storeId}/billboards/${params.billboardId}`,
				data
			);
		},
		onError: () => {
			toast.error("Cannot edit Billboards");
		},
		onSuccess: () => {
			router.push(`/${params.storeId}/billboards`);
			router.refresh();
		},
	});

	return { editBillboards, isEditing };
};
