import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AxiosError } from "axios"
import { useToast } from "@/hooks/use-toast"
import { AddBorrowedBookSchema } from "@/schema"
import { addBorrowedBook, findStudent, getBook } from "@/services/api"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"

export default function AddBorrowedBook() {
    const { id } = useParams<{ id: string }>()
    const { toast } = useToast()
    const [studentID, setStudentID] = useState('')
    const [studentError, setStudentError] = useState<string | null>(null)
    const form = useForm<z.infer<typeof AddBorrowedBookSchema>>({
        resolver: zodResolver(AddBorrowedBookSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            book_title: "",
            book_author: "",
            student_id: 0,
            due_date: new Date(Date.now() + (3600 * 1000 * 24 * 7)),
            book_id: 0
        },
    })

    useEffect(() => {
        const fetchBook = async () => {
            try {
                if (id) {
                    const data = await getBook(id);
                    console.log(data)
                    form.setValue('book_id', data.book_id);
                    form.clearErrors('book_id')
                    form.setValue('book_title', data.title);
                    form.clearErrors('book_title')
                    form.setValue('book_author', data.author);
                    form.clearErrors('book_author')
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchBook();
    }, [id, form]);

    async function handleFindStudent(e: React.FormEvent) {
        try {
            e.preventDefault()
            setStudentError(null)
            const res = await findStudent(studentID);
            // console.log(res);
            form.setValue('student_id', res.data.student_id)
            form.setValue('first_name', res.data.first_name)
            form.setValue('last_name', res.data.last_name)
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data)
                setStudentError(error.response?.data)
            }
                
            
        }

    }


    async function onSubmit(data: z.infer<typeof AddBorrowedBookSchema>) {
        console.log(data)
        try {
            const { book_id, student_id, due_date } = data;
            const res = await addBorrowedBook(book_id, student_id, due_date
            );
            if (res.success) {
                console.log("Done");
                toast({
                    title: "Book Lent",
                    description: "Book has been Lent successfully.",
                })
            }
        } catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                console.log(error.response?.data)
            }
        }
    }
    const isStudentFound = form.watch("student_id") > 0;

    const isSubmitting = form.formState.isSubmitting

    return (
        <main className="flex flex-1 flex-col gap-6 p-4">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">Lend Out a Book</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
                <div className="grid gap-6">
                    <Card x-chunk="dashboard-04-chunk-1">
                        <CardHeader>
                            <CardTitle>Find Student</CardTitle>
                            <CardDescription>
                                Search for a student using their ID
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleFindStudent}>
                            <CardContent>
                                <Input name="studentID" onChange={(e) => setStudentID(e.target.value)} placeholder="Student ID" />
                                <p className="text-red-600">{studentError}</p>
                            </CardContent>
                            
                            <CardFooter className="border-t px-6 py-4">
                                <Button type="submit">Search</Button>
                            </CardFooter>
                        </form>
                    </Card>
                    {isStudentFound && (<Card x-chunk="dashboard-04-chunk-2">
                        <CardHeader>
                            <CardTitle>Student & Book Details</CardTitle>
                            <CardDescription>
                                The Student And Book Info
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <CardContent>
                                        <div className="grid gap-4">
                                            <div className=" gap-2 hidden">
                                                <FormField
                                                    control={form.control}
                                                    name="book_id"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Book</FormLabel>
                                                            <FormControl>
                                                                <Input type="number" placeholder="" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="hidden gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="student_id"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Student ID</FormLabel>
                                                            <FormControl>
                                                                <Input type="text" placeholder="" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="first_name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Student First Name</FormLabel>
                                                            <FormControl>
                                                                <Input disabled type="text" placeholder="" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="last_name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Student Last Name</FormLabel>
                                                            <FormControl>
                                                                <Input disabled type="text" placeholder="" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="book_title"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Book Title</FormLabel>
                                                            <FormControl>
                                                                <Input disabled type="text" placeholder="" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="book_author"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Book Author</FormLabel>
                                                            <FormControl>
                                                                <Input disabled type="text" placeholder="" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="due_date"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col">
                                                            <FormLabel>Due Date</FormLabel>
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <FormControl>
                                                                        <Button
                                                                            variant={"outline"}
                                                                            className={cn(
                                                                                "w-[240px] pl-3 text-left font-normal",
                                                                                !field.value && "text-muted-foreground"
                                                                            )}
                                                                        >
                                                                            {field.value ? (
                                                                                format(field.value, "PPP")
                                                                            ) : (
                                                                                <span>Pick a date</span>
                                                                            )}
                                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={field.value}
                                                                        onSelect={field.onChange}
                                                                        disabled={(date) =>
                                                                            date < new Date()
                                                                        }
                                                                        initialFocus
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="border-t px-6 py-4">
                                        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Lending Book..." : "Lend Book"}</Button>
                                    </CardFooter>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>)}
                    
                </div>
            </div>
        </main>
    )
}
