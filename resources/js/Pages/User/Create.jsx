import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/users");
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Create User</h1>

            <form onSubmit={submit} className="mt-4 space-y-4">
                <div>
                    <Label>Name</Label>
                    <Input value={data.name} onChange={(e) => setData("name", e.target.value)} />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>

                <div>
                    <Label>Email</Label>
                    <Input type="email" value={data.email} onChange={(e) => setData("email", e.target.value)} />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>

                <div>
                    <Label>Password</Label>
                    <Input type="password" value={data.password} onChange={(e) => setData("password", e.target.value)} />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                </div>

                <div>
                    <Label>Role</Label>
                    <select value={data.role} onChange={(e) => setData("role", e.target.value)} className="input">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>

                <Button type="submit" disabled={processing}>Save</Button>
            </form>
        </div>
    );
}
