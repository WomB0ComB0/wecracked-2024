"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import { createAPIClient } from "@/lib/posts";
import { z } from "zod";
import { PostSchema } from "@/schema/posts";

const apiClient = createAPIClient();

const MainContent = () => {
  const [posts, setPosts] = useState<z.infer<typeof PostSchema>[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await apiClient.posts.getAll();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    return post.type === filter.toUpperCase();
  });

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all" onValueChange={setFilter}>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="FEATURED">Featured</TabsTrigger>
            <TabsTrigger value="LATEST">Latest</TabsTrigger>
            <TabsTrigger value="RELATED" className="hidden sm:flex">
              Related
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={filter === "FEATURED"} onCheckedChange={() => setFilter("FEATURED")}>
                  Featured
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={filter === "LATEST"} onCheckedChange={() => setFilter("LATEST")}>
                  Latest
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={filter === "RELATED"} onCheckedChange={() => setFilter("RELATED")}>
                  Related
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Posts</CardTitle>
              <CardDescription>
                Manage your Posts and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Price
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Total Sales
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src="/placeholder.svg"
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {post.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{post.type}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        $499.99
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        25
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(post.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>{posts.length}</strong> Posts
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default MainContent;