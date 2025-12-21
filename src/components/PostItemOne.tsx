import React from "react";
import "./postItemOne.css";
import Link from "next/link";
import { PostProps } from "@/sections/Posts";
import Image from "next/image";

export default function PostItemOne({
    large,
    item,
}: {
    large: boolean;
    item: PostProps;
}) {
    return (
        <div className={`post-entry-1 ${large ? "lg" : ""}`}>
            <Link href={`postitems/${item._id}`}>
                {item.img && (
                    <div className="ratio ratio-16x9 mb-3">
                        <Image
                            src={item.img.startsWith('http') ? item.img : `/${item.img}`}
                            alt={item.title}
                            fill
                            className="object-fit-cover"
                        />
                    </div>
                )}
            </Link>
            <div className="post-meta">
                <span className="date">{item.category}</span>
                <span className="mx-1">
                    <i className="bi bi-dot"></i>{" "}
                </span>{" "}
                <span>{new Date(item.date).toLocaleDateString("en-US")}</span>
            </div>
            <h2>
                <Link href={`postitems/${item._id}`}>{item.title}</Link>
            </h2>
            {large ? (
                <>
                    <p className="mb-4 d-block">{item.brief}</p>

                    <div className="d-flex align-items-center author">
                        <div className="photo">
                            {item.avatar && (
                                <Image
                                    src={item.avatar.startsWith('http') ? item.avatar : `/${item.avatar}`}
                                    alt={item.author}
                                    width={40}
                                    height={40}
                                    className="img-fluid rounded-circle"
                                />
                            )}
                        </div>
                        <div className="name">
                            <h3 className="m-0 p-0">{item.author}</h3>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
}
