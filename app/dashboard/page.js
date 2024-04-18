"use client";
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function Page() {
  const [contacts, setContacts] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const getContact = async () => {
    setIsloading(true);
    try {
      const url = localStorage.getItem("url") + "user.php";
      const userId = localStorage.getItem("userId");
      const jsonData = { userId: userId };
      const formData = new FormData();
      formData.append("operation", "getContact");
      formData.append("json", JSON.stringify(jsonData));
      const res = await axios.post(url, formData);
      console.log("res ni getContact", res.data);
      if (res !== 0) {
        setContacts(res.data);
      }
    } catch (error) {
      toast.error("Network error");
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }

  useEffect(() => {
    getContact();
  }, []);

  return (
    <div>
      <Navbar />

      <Table className="mt-3 text-center">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Contact number</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.length <= 0 ? <TableRow><TableCell colSpan={3}>No have no contacts</TableCell></TableRow> :
            contacts.map((contact, index) => (
              <TableRow key={index}>
                <TableCell>{contact.con_fullName}</TableCell>
                <TableCell>{contact.con_contactNumber}</TableCell>
                <TableCell>{contact.con_email}</TableCell>
                <TableCell>
                  <Button variant="outline" className="ml-2 mt-2">Edit</Button>
                  <Button variant="destructive" className="ml-2 mt-2">Delete</Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

    </div>
  )
}
