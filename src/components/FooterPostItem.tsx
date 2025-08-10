import Link from 'next/link';
import React from 'react';

export default function FooterPostItem({
  item,
}: {
  item: {
    _id: string;
    img: string;
    category: string;
    date: string;
    title: string;
    brief: string;
    avatar: string;
    author: string;
  };
}) {
  return (
    <li>
      <Link
        href={`/postitems/${item._id}`}
        className="d-flex align-items-center"
      >
        <img src={`/${item.img}`} alt="" className="img-fluid me-3" />
        <div>
          <div className="post-meta d-block">
            <span className="date">{item.category}</span>
            <span className="mx-1">
              <i className="bi bi-dot"></i>
            </span>
            <span>{new Date(item.date).toLocaleDateString('en-US')}</span>
          </div>
          <span>{item.title}</span>
        </div>
      </Link>
    </li>
  );
}
