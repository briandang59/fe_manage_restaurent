import { useState, useEffect } from "react";

type Employee = {
    address: string;
    avatar_file_id: number;
    base_salary: number;
    birthday: string;
    email: string;
    full_name: string;
    gender: boolean;
    id: number;
    join_date: string;
    phone_number: string;
    salary_per_hour: number;
    schedule_type: string;
};

type Role = {
    id: number;
    role_name: string;
};

export function useAppLocalStorage() {
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<Role | null>(null);
    const [user, setUser] = useState<any>(null);
    const [auth, setAuth] = useState<any>(null);

    useEffect(() => {
        try {
            const emp = localStorage.getItem("employee");
            setEmployee(emp ? JSON.parse(emp) : null);

            const tok = localStorage.getItem("token");
            setToken(tok ?? null);

            const rl = localStorage.getItem("role");
            setRole(rl ? JSON.parse(rl) : null);

            const usr = localStorage.getItem("user");
            setUser(usr ? JSON.parse(usr) : null);

            const au = localStorage.getItem("auth");
            setAuth(au ? JSON.parse(au) : null);
        } catch (error) {
            console.error("Lỗi khi parse localStorage:", error);
        }
    }, []);

    return { employee, token, role, user, auth };
}
