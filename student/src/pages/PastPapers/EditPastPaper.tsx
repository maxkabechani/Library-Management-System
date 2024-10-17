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
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AxiosError } from "axios"
import { AddPastPaperSchema } from "@/schema"
import { addPastPaper } from "@/services/api"

export default function EditPastPaper() {
    const form = useForm<z.infer<typeof AddPastPaperSchema>>({
        resolver: zodResolver(AddPastPaperSchema),
        defaultValues: {
            title: "",
            file: ""
        },
    })


    async function onSubmit(data: z.infer<typeof AddPastPaperSchema>) {
        try {
            const { title,
                file } = data;
            const res = await addPastPaper(title,
                file);
            console.log(data)
            if (res.data.success) {
                console.log(res)
            }
        } catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                console.log(error.response?.data)
            }
        }
    }
    const isSubmitting = form.formState.isSubmitting;

    return (
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">Add Past-Paper</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
                <div className="grid gap-6">
                    <Card x-chunk="dashboard-04-chunk-1">
                        <CardHeader>
                            <CardTitle>Add Past-Paper</CardTitle>
                            <CardDescription>
                                Fill in the title and upload document below
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <CardContent>
                                        <div className="grid gap-4">
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="title"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Title</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="file"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>File</FormLabel>
                                                            <FormControl>
                                                                <Input type="file" placeholder="" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="border-t px-6 py-4">
                                        <Button type="submit" disabled={isSubmitting}>Add Past-Paper</Button>
                                    </CardFooter>
                                </form>
                            </Form>
                        </CardContent>

                    </Card>
                </div>
            </div>
        </main>
    )
}
