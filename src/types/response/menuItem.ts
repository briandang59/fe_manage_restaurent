import { AttachmentResponse } from "./attachment";

    export interface MenuItemResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    file_id: string | null;
    file: AttachmentResponse;
    status: string;
    created_at: string;
    updated_at: string;
}
