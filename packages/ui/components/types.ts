import type { IconName } from "./IconName";

export type TableColumn<T> = {
	key: keyof T;
	label: string;
	formatter?: (value: any) => string;
};

export type TableColumns<T> = TableColumn<T>[];

export type NavItem = {
	label: string;
	path: string;
	icon?: IconName;
};

export type NavGroup = {
	label: string;
	items: NavItem[];
};
