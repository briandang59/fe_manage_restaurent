export type ApplyRecruitmentResponseType = {
    id: number;
    recruitment_id: number;
    fullname: string;
    email: string;
    phone_number: string;
    cv_id: number;
    recruitment: {
        id: number;
        title: string;
        content: string;
        is_open: boolean;
        created_at: string;
        updated_at: string;
    };
    cv: {
        id: number;
        file_name: string;
        url: string;
        mime_type: string;
        size: number;
        public_id: string;
        resource_type: string;
        folder: string;
        created_at: string;
        updated_at: string;
    };
    created_at: string;
    updated_at: string;
};
