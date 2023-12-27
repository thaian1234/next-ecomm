"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/legacy/image";

interface ImageUploadProps {
	disabled: boolean;
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	value: string[];
}

export default function ImageUpload({
	disabled,
	onChange,
	onRemove,
	value,
}: ImageUploadProps) {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	function onUpload(result: any) {
		onChange(result.info.secure_url);
	}

	if (!isMounted) return null;

	return (
		<div>
			<div className="flex items-center gap-4 mb-4">
				{value.map((url) => (
					<div
						key={url}
						className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
					>
						<div className="absolute z-10 top-2 right-2">
							<Button
								type="button"
								onClick={() => onRemove(url)}
								variant="destructive"
								size="icon"
							>
								<Trash className="size-4" />
							</Button>
						</div>

						<Image
							className="object-cover"
							alt="Image"
							src={url}
							layout="fill"
						/>
					</div>
				))}
			</div>
			<CldUploadWidget onUpload={onUpload} uploadPreset="ce6g6ryb">
				{({ open }) => {
					const onClick = () => {
						open();
					};

					return (
						<Button
							type="button"
							disabled={disabled}
							variant="secondary"
							onClick={onClick}
						>
							<ImagePlus className="mr-2 size-4" />
							Upload an image
						</Button>
					);
				}}
			</CldUploadWidget>
		</div>
	);
}
