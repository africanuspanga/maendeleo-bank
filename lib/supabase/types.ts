export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type ContentStatus = "draft" | "published";
export type ReportCategory =
	| "annual-report"
	| "agm-book"
	| "financial-statement"
	| "disclosure";

export interface Database {
	public: {
		Tables: {
			forex_rates: {
				Row: {
					id: string;
					currency: string;
					label: string;
					buy: number;
					sell: number;
					sort_order: number;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					currency: string;
					label: string;
					buy?: number;
					sell?: number;
					sort_order?: number;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					currency?: string;
					label?: string;
					buy?: number;
					sell?: number;
					sort_order?: number;
					created_at?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			news: {
				Row: {
					id: string;
					slug: string;
					title: string;
					title_sw: string | null;
					excerpt: string | null;
					body: string | null;
					image_url: string | null;
					published_at: string | null;
					status: ContentStatus;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					slug: string;
					title: string;
					title_sw?: string | null;
					excerpt?: string | null;
					body?: string | null;
					image_url?: string | null;
					published_at?: string | null;
					status?: ContentStatus;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					slug?: string;
					title?: string;
					title_sw?: string | null;
					excerpt?: string | null;
					body?: string | null;
					image_url?: string | null;
					published_at?: string | null;
					status?: ContentStatus;
					created_at?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			careers: {
				Row: {
					id: string;
					title: string;
					location: string | null;
					type: string | null;
					deadline: string | null;
					description: string | null;
					pdf_url: string | null;
					status: ContentStatus;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					title: string;
					location?: string | null;
					type?: string | null;
					deadline?: string | null;
					description?: string | null;
					pdf_url?: string | null;
					status?: ContentStatus;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					title?: string;
					location?: string | null;
					type?: string | null;
					deadline?: string | null;
					description?: string | null;
					pdf_url?: string | null;
					status?: ContentStatus;
					created_at?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			tenders: {
				Row: {
					id: string;
					title: string;
					reference: string | null;
					deadline: string | null;
					description: string | null;
					pdf_url: string | null;
					status: ContentStatus;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					title: string;
					reference?: string | null;
					deadline?: string | null;
					description?: string | null;
					pdf_url?: string | null;
					status?: ContentStatus;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					title?: string;
					reference?: string | null;
					deadline?: string | null;
					description?: string | null;
					pdf_url?: string | null;
					status?: ContentStatus;
					created_at?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			reports: {
				Row: {
					id: string;
					title: string;
					category: ReportCategory;
					year: number | null;
					file_url: string | null;
					published_at: string | null;
					status: ContentStatus;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					title: string;
					category: ReportCategory;
					year?: number | null;
					file_url?: string | null;
					published_at?: string | null;
					status?: ContentStatus;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					title?: string;
					category?: ReportCategory;
					year?: number | null;
					file_url?: string | null;
					published_at?: string | null;
					status?: ContentStatus;
					created_at?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			site_content: {
				Row: {
					key: string;
					value: Json;
					updated_at: string;
				};
				Insert: {
					key: string;
					value: Json;
					updated_at?: string;
				};
				Update: {
					key?: string;
					value?: Json;
					updated_at?: string;
				};
				Relationships: [];
			};
		};
		Views: Record<string, never>;
		Functions: Record<string, never>;
		Enums: Record<string, never>;
		CompositeTypes: Record<string, never>;
	};
}

export type ForexRate = Database["public"]["Tables"]["forex_rates"]["Row"];
export type NewsItem = Database["public"]["Tables"]["news"]["Row"];
export type Career = Database["public"]["Tables"]["careers"]["Row"];
export type Tender = Database["public"]["Tables"]["tenders"]["Row"];
export type Report = Database["public"]["Tables"]["reports"]["Row"];
export type SiteContent = Database["public"]["Tables"]["site_content"]["Row"];
