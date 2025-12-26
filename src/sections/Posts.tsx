'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './posts.css';
import PostItemOne from '@/components/PostItemOne';
import TrendingPost from '@/components/TrendingPost';
import Preloader from '@/components/Preloader';

export interface PostProps {
  _id: string;
  img: string;
  category: string;
  date: string;
  title: string;
  brief: string;
  avatar: string;
  author: string;
  trending?: boolean;
  top?: boolean;
}

export const initialPost = {
  _id: '',
  img: '',
  category: '',
  date: '',
  title: '',
  brief: '',
  avatar: '',
  author: '',
};

export default function Post() {
  const router = useRouter();
  const [items, setItems] = useState<PostProps[]>([]);
  const [item, setItem] = useState<PostProps>(initialPost);

  function getItemData() {
    fetch(`/api/postitems`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        // Dynamically select featured post (first "top" post, or first post if none)
        if (data && data.length > 0) {
          const topPost = data.find((p: { top: boolean }) => p.top) || data[0];
          setItem(topPost);
        }
      })
      .catch(e => console.log(e.message));
  }

  useEffect(() => {
    getItemData();
  }, []);

  return (
    <section id="posts" className="posts">
      <div className="container" data-aos="fade-up">
        <div className="row g-5">
          <div className="col-lg-4">
            <PostItemOne large={true} item={item} />
          </div>
          <div className="col-lg-8">
            <div className="row g-5">
              <div className="col-lg-4 border-start custom-border">
                {items &&
                  items.length > 0 ? items
                    .filter((item: PostProps) =>
                      !item.trending && !item.top
                    )
                    .slice(0, 3)
                    .map((item: PostProps) => (
                      <PostItemOne key={item._id} large={false} item={item} />
                    )
                    ) : <Preloader />
                }
              </div>
              <div className="col-lg-4 border-start custom-border">
                {items &&
                  items.length > 0 ? items
                    .filter((item: PostProps) =>
                      !item.trending && !item.top
                    )
                    .slice(3, 6)
                    .map((item: PostProps) => (
                      <PostItemOne key={item._id} large={false} item={item} />
                    )
                    ) : <Preloader />
                }
              </div>
              <div className="col-lg-4">
                <div className="trending">
                  <h3>Trending</h3>
                  <ul className="trending-post">
                    {items &&
                      items.length > 0 ? items
                        .filter((item: PostProps) => item.trending)
                        .map((item: PostProps, index: number) => (
                          <TrendingPost
                            key={item._id}
                            index={index}
                            item={item}
                          />
                        )
                        ) : <Preloader />
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}