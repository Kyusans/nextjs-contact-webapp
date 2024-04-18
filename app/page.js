"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import Spinner from "@/components/ui/spinner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "This field is required",
  }),
  password: z.string().min(1, {
    message: "This field is required",
  }),
})


export default function Home() {
  const router = useRouter();

  const [isLoading, setIsloading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })


  const onSubmit = async (values) => {
    setIsloading(true);
    try {
      const url = localStorage.getItem("url") + "user.php";
      const formData = new FormData();
      formData.append("operation", "login");
      formData.append("json", JSON.stringify(values));
      const res = await axios.post(url, formData);
      console.log("res mo to, " + JSON.stringify(res));
      if (res.data === 0) {
        toast.error("Invalid username or password");
      } else {
        toast.success("Login successful");
        localStorage.setItem("userId", res.data.user_id);
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Network error")
      console.log("error ni login: " + error);
    } finally {
      setIsloading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("url") !== "http://localhost/contact/api/") {
      localStorage.setItem("url", "http://localhost/contact/api/");
    }
  }, []);

  return (
    <div class="flex justify-center items-center h-screen">
      <Form {...form}>
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-center text-3xl">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                <Button type="submit" className="w-full" disabled={isLoading}> {isLoading && <Spinner />} <p className={isLoading && "ml-2"}>Login</p></Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Form>
    </div>
  )
}
