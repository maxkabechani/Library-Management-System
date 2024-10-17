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
import { addBook } from "@/services/api"
import { useToast } from "@/hooks/use-toast"

export default function AddBook() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof AddBookSchema>>({
    resolver: zodResolver(AddBookSchema),
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      publishedYear: 2000,
      genre: "",
      edition: 1,
      description: "",
      availableCopies: 1,
      totalCopies: 1,
      location: "",
    },
  })


  async function onSubmit(data: z.infer<typeof AddBookSchema>) {
    console.log(data)
    try {
      const { title,
        author,
        isbn,
        publishedYear,
        edition,
        genre,
        description,
        availableCopies,
        totalCopies,
        location, } = data;
      const res = await addBook(title,
        author,
        isbn,
        publishedYear,
        edition,
        genre,
        description,
        availableCopies,
        totalCopies,
        location,);
      if (res.success) {
        console.log("Done");
        toast({
          title: "Book Added",
          description: "Book has been added to Library.",
        })
        form.reset()
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
        <h1 className="text-3xl font-semibold">Add Book</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
        <div className="grid gap-6">
          <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
              <CardTitle>Add Book</CardTitle>
              <CardDescription>
                Fill in the details to add a book
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
                    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Adding Book..." : "Add Book"}</Button>
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
