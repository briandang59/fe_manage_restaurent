import { PermissionResponse } from "./permission";

export interface RoleResponse {
    id: number;
    role_name: string;
    permissions: (number | PermissionResponse)[];
    created_at: string;
    updated_at: string;
}
