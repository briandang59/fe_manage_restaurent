import { RoleResponse } from "./roles";

export interface AccountResponse {
    id: number;
    user_name: string;
    role_id: RoleResponse;
    created_at: string;
    updated_at: string;
}
