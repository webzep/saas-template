export interface StripePrice {
	amount: number;
	description: string;
	features: string[];
	interval: "month" | "year";
	isPopular?: boolean;
	priceId: string;
	title: string;
}

// Raw from the CSV file
type PriceRaw = {
	price_id: string;
	product_id: string;
	product_name: string;
	product_statement_descriptor: string;
	product_tax_code: string;
	description: string;
	created_utc: string;
	amount: string;
	currency: string;
	interval: string;
	interval_count: string;
	usage_type: string;
	aggregate_usage: string;
	billing_scheme: string;
	trial_period_days: string;
	tax_behavior: string;
};

// Formatted price data
type PriceFormatted = Omit<PriceRaw, "amount"> & {
	amount: number;
	amount_formatted: string;
};

// Custom info for each price
type PriceInformation = {
	features: string[];
	isPopular?: boolean;
};

// Usable price item with price data and custom info
export type PriceItem = PriceFormatted & {
	amount: number;
	features: string[];
	isPopular: boolean;
};

// Dump the prices CSV content exported from Stripe
const csvContent = `Price ID,Product ID,Product Name,Product Statement Descriptor,Product Tax Code,Description,Created (UTC),Amount,Currency,Interval,Interval Count,Usage Type,Aggregate Usage,Billing Scheme,Trial Period Days,Tax Behavior
price_1R4FdHLT1k80qXuXD5OnIur1,prod_RyC1QaW8OvCRlV,Social Pro,,,Heyo,2025-03-19 05:57,29.90,aud,month,1,licensed,,per_unit,,unspecified
price_1R4FdHLT1k80qXuXD5OnIur2,prod_RyC1QaW8OvCRl2,Social Butterfly,,,,2025-03-19 05:57,0,aud,month,1,licensed,,per_unit,,unspecified
price_1R4FdHLT1k80qXuXD5OnIur3,prod_RyC1QaW8OvCRl3,Social Lord,,,,2025-03-19 05:57,99.90,aud,month,1,licensed,,per_unit,,unspecified`;

// Add custom info to each price
const priceInfo: Record<string, PriceInformation> = {
	price_1R4FdHLT1k80qXuXD5OnIur1: {
		features: [
			"Up to 5 social media posts per day",
			"Basic analytics dashboard",
			"Standard support",
			"1 social media account",
			"Basic scheduling"
		],
		isPopular: true
	},
	price_1R4FdHLT1k80qXuXD5OnIur2: {
		features: [
			"Up to 5 social media posts per day",
			"Basic analytics dashboard",
			"Standard support",
			"1 social media account",
			"Basic scheduling"
		]
	},
	price_1R4FdHLT1k80qXuXD5OnIur3: {
		features: [
			"Everything in Pro",
			"Unlimited social media accounts",
			"Dedicated account manager",
			"Custom integrations",
			"SLA guarantee",
			"Advanced security features",
			"Team collaboration tools",
			"Custom reporting",
			"White-label options",
			"24/7 phone support"
		]
	}
};

const csvData = csvContent.split("\n").map((row) => row.split(","));

// Remove spaces in the headers and remove parens
const headers = csvData[0].map((h) =>
	h.trim().toLowerCase().replace(/\s+/g, "_").replace(/\(/g, "").replace(/\)/g, "")
);

// Create an array of objects for the rows where the keys are the headers and the values are the row data
const rawRows = csvData.slice(1);
const rows = rawRows
	.map((row) => {
		const rawRow = Object.fromEntries(headers.map((h, i) => [h, row[i]])) as unknown as PriceRaw;

		const rowData: PriceFormatted = {
			...rawRow,
			amount: Number(rawRow.amount) * 100,
			amount_formatted: new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: rawRow.currency,
				minimumFractionDigits: 2
			}).format(Number(rawRow.amount))
		};

		return rowData;
	})
	.sort((a, b) => a.amount - b.amount);

// Create a price item with price data and custom info
export const priceItems: Record<string, PriceItem> = Object.fromEntries(
	rows.map((row) => [row.price_id, { ...row, ...priceInfo[row.price_id] }])
) as Record<string, PriceItem>;
