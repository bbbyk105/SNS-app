import { supabase } from "../lib/supabase"

export const authRepository = {
    async signup(name, email, password) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name } },
        });
        if (error) throw new Error(error.message);

        return { ...data.user, userName: data.user.user_metadata.name };
    },
    async signin(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw new Error(error.message);

        return {
            ...data.user,
            userName: data.user.user_metadata.name,
        };
    },
    async getCurrentUser() {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw new Error(error.message);
        if (data.session == null) return;

        // sessionオブジェクトからuserを直接取り出し、emailも含めて返す
        const user = data.session.user;
        return {
            id: user.id,
            email: user.email,  // emailを直接取得
            userName: user.user_metadata.name,  // userNameを取得
        };
    }
};
