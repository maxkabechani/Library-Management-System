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
import { addPastPaper, getSchools } from "@/services/api"
import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
export default function AddPastPaper() {
    const [schools, setSchools] = useState<{ school_id: number, name: string }[] | null>(null)
    const form = useForm<z.infer<typeof AddPastPaperSchema>>({
        resolver: zodResolver(AddPastPaperSchema),
        defaultValues: {
            title: "",
            file: undefined,
            school: undefined
        },
    })


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                setLoading(true);
                const data = await getSchools();
                console.log(data)
                setSchools(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSchools();
    }, []);


    async function onSubmit(data: z.infer<typeof AddPastPaperSchema>) {
        try {
            const { title, school,
                file } = data;
            const res = await addPastPaper(title, school.toString(),
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

    if (loading) {
        return <div>Loading schools...</div>;
    }
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
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <CardContent>
                                        <div className="grid gap-4">
                                            {/* Title Field */}
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="title"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Title</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter title" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {/* School Field */}
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="school"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>School</FormLabel>
                                                            <Select onValueChange={field.onChange}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select a school" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {schools?.map((school) => (
                                                                        <SelectItem key={school.school_id} value={String(school.school_id)}>
                                                                            {school.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                            </div>

                                            {/* File Field */}
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="file"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>File</FormLabel>
                                                            <FormControl>
                                                                {/* Handle file upload manually */}
                                                                <Input
                                                                    type="file"
                                                                    placeholder=""
                                                                    onChange={(e) => {
                                                                        field.onChange(e.target.files ? e.target.files[0] : null); // Get the first file
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="border-t px-6 py-4">
                                        <Button type="submit" disabled={isSubmitting}>Add Past Paper</Button>
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
