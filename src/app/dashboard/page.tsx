"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import env from '@/env';

interface Post {
  id: string;
  title: string;
  description: string;
}

const apiUrl=env.API_URL;

const Dashboard: React.FC = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [featuredRes, latestRes] = await Promise.all([
          axios.get<Post[]>(`${apiUrl}/posts/featured`),
          axios.get<Post[]>(`${apiUrl}/posts/latest`),
        ]);

        setFeaturedPosts(featuredRes.data);
        setLatestPosts(latestRes.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get<Post[]>(`${apiUrl}/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  return (
    <div className="bg-[#133443] text-[#fdfefe] min-h-screen">
      <Head>
        <title>Dashboard</title>
      </Head>
      <nav className="bg-[#022031] p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-[#e9f7f9] text-xl font-bold">Dashboard</Link>
        
        </div>
        <div className="flex items-center space-x-4">
		<form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts"
              className="p-2 rounded-l-md border border-gray-300"
            />
            <Button type="submit" className="rounded-r-md">Search</Button>
          </form>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <section>
          <h2 className="text-2xl font-bold mb-4">Featured Posts</h2>
          <div className="grid grid-cols-1 gap-4">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="p-4 bg-[#406a7b]">
                <CardHeader>
                  <CardTitle className="text-[#e9f7f9]">{post.title}</CardTitle>
                  <CardDescription className="text-[#e9f7f9]">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/posts/${post.id}`} className="text-[#fdfefe] hover:underline">
                    Read more
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
          <div className="grid grid-cols-1 gap-4">
            {latestPosts.map((post) => (
              <Card key={post.id} className="p-4 bg-[#406a7b]">
                <CardHeader>
                  <CardTitle className="text-[#e9f7f9]">{post.title}</CardTitle>
                  <CardDescription className="text-[#e9f7f9]">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/posts/${post.id}`} className="text-[#fdfefe] hover:underline">
                    Read more
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        {searchResults.length > 0 && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 gap-4">
              {searchResults.map((post) => (
                <Card key={post.id} className="p-4 bg-[#406a7b]">
                  <CardHeader>
                    <CardTitle className="text-[#e9f7f9]">{post.title}</CardTitle>
                    <CardDescription className="text-[#e9f7f9]">{post.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/posts/${post.id}`} className="text-[#fdfefe] hover:underline">
                      Read more
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
