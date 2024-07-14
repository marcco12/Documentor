export interface message {
	Timestamp: Date;
	UserID: string;
	UserName: string;
	DocumentID: string;
	DocumentTitle: string;
}

export interface user {
	ID: string;
	Name: string;
}

export interface document {
	ID: string;
	CreatedAt: Date;
	UpdatedAt: Date;
	Title: string;
	Attachments: string[];
	Contributors: user[];
	Version: string;
}

export type sortFields = "Title" | "Version" | "CreatedAt";
