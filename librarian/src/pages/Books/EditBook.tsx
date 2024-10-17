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
import { AddBookSchema } from "@/schema"
import { editBook, getBook } from "@/services/api"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

export default function EditBook() {
  const { id } = useParams<{id: string}>();
  const { toast } = useToast()


  const form = useForm<z.infer<typeof AddBookSchema>>({
    resolver: zodResolver(AddBookSchema),
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      edition: 0,
      publishedYear: 2000,
      genre: "",
      description: "",
      availableCopies: 0,
      totalCopies: 0,
      location: "",
    },
  })


  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (id) {
          const data = await getBook(id);
          form.setValue('title', data.title);
          form.clearErrors('title')
          form.setValue('author', data.author);
          form.setValue('isbn', data.isbn);
          form.setValue('publishedYear', data.published_year);
          form.setValue('edition', data.edition);
          form.setValue('genre', data.genre);
          form.setValue('description', data.description);
          form.setValue('availableCopies', data.available_copies);
          form.setValue('totalCopies', data.total_copies);
          form.setValue('location', data.location);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBook();
  }, [id, form]);

  async function onSubmit(data: z.infer<typeof AddBookSchema>) {
    try {
      console.log("Hello")
      const { title,
        author,
        isbn,
        publishedYear,
        genre,
        edition,
        description,
        availableCopies,
        totalCopies,
        location, } = data;
      const res = await editBook(id!, title,
        author,
        isbn,
        publishedYear,
        edition,
        genre,
        description,
        availableCopies,
        totalCopies,
        location,);
      console.log(data)
      if (res.success) {
        console.log("Done");
        toast({
          title: "Book Updated",
          description: "Book has been updated Successfully!",
        })
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
        <h1 className="text-3xl font-semibold">Edit Book</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
        <div className="grid gap-6">
          <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
              <CardTitle>Edit Book</CardTitle>
              <CardDescription>
                Change the details of the book below
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
                          name="author"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Author</FormLabel>
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
                          name="isbn"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ISBN</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="publishedYear"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Published Year</FormLabel>
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
                          name="edition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Edition</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="genre"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Genre</FormLabel>
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
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
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
                          name="availableCopies"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Available Copies</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="totalCopies"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Total Copies</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input type="text" placeholder="" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Updating Book..." : "Update Book"}</Button>
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
