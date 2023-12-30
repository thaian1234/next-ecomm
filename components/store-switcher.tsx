"use client";

import React, { useState } from "react";
import {
	Check,
	ChevronsUpDown,
	PlusCircle,
	Store as StoreIcon,
} from "lucide-react";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { Store } from "@prisma/client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandItem,
	CommandSeparator,
} from "@/components/ui/command";

type PopOverTriggerProps = React.ComponentPropsWithoutRef<
	typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopOverTriggerProps {
	items: Store[];
}

export default function StoreSwitcher({
	className,
	items = [],
}: StoreSwitcherProps) {
	const storeModal = useStoreModal();
	const params = useParams();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const formattedItems = items.map((item) => ({
		label: item.name,
		value: item.id,
	}));

	const currentStore = formattedItems.find(
		(item) => item.value === params.storeId
	);

	const onStoreSelect = (store: { value: string; label: string }) => {
		setIsOpen(false);
		router.push(`/${store.value}`);
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					role="combobox"
					aria-expanded={isOpen}
					aria-label="Select a store"
					className={cn("w-[200px] justify-between", className)}
				>
					<StoreIcon className="w-4 h-4 mr-2 " />
					{currentStore?.label}
					<ChevronsUpDown className="w-4 h-4 ml-auto opacity-50 shrink-0" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandList>
						<CommandInput placeholder="Search store..." />
						<CommandEmpty>No store found.</CommandEmpty>
						<CommandGroup heading="Store">
							{formattedItems.map((store) => (
								<CommandItem
									key={store.value}
									onSelect={() => onStoreSelect(store)}
									className="text-sm cursor-pointer"
								>
									<StoreIcon className="w-4 h-4 mr-2" />
									{store?.label}
									<Check
										className={cn(
											"ml-auto h-4 w-4",
											currentStore?.value === store.value
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>

					<CommandSeparator />

					<CommandList>
						<CommandGroup>
							<CommandItem
								className="cursor-pointer"
								onSelect={() => {
									setIsOpen(false);
									storeModal.onOpen();
								}}
							>
								<PlusCircle className="w-5 h-5 mr-2" />
								Create Store
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
