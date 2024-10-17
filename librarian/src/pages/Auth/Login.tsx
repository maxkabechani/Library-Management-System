import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { LoginSchema } from "@/schema"
import { login } from "@/services/api"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"


export default function Login() {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })


    async function onSubmit(data: z.infer<typeof LoginSchema>) {
        try {
            const { email, password } = data;
            const res = await login(email, password);
            console.log(data)
            if (res.data.success) {
                navigate('/')
                console.log(res)
            }
        } catch (error) {
            console.log(error)
            if(error instanceof AxiosError) {
                form.setError('email', { type: 'server', message: error.response?.data });
                form.setError('password', { type: 'server', message: error.response?.data });
            }

        }
    }
    const isSubmitting = form.formState.isSubmitting;

    return (
        <main className="grid min-h-screen place-content-center">
            {/* {error && <p className="text-red-500">{error}</p>} */}
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input autoComplete="username" placeholder="email@exmaple.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input autoComplete="current-password" type="password" placeholder="********" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Please Wait..." : "Login"}
                                </Button>
                            </div>
                        </CardContent>
                    </form>
                </Form>
            </Card>
        </main>
    )
}
