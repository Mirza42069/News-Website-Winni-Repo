"use client";

import { initialPost, PostProps } from "@/sections/Posts";
import React, { useState, useEffect } from "react";
import "./style.css";
import Preloader from "@/components/Preloader";
import SidePostItem from "@/components/SidePostItem";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Postitem({ params }: { params: { id: string } }) {
  const id: string = params.id;
  const router = useRouter();
  const [item, setItem] = useState(initialPost);
  const [items, setItems] = useState([]);

  const tabsData = [
    { id: 1, name: "Popular", active: true },
    { id: 2, name: "Trending", active: false },
  ];

  const [tabs, setTabs] = useState(tabsData);

  const handleTabActive = (id: number): void => {
    setTabs(
      tabsData.map((tab) => {
        tab.active = false;
        if (tab.id === id) tab.active = true;
        return tab;
      })
    );
  };

  const getSinglePostData = () => {
    fetch(`/api/postitems/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data))
      .catch((e) => console.log(e.message));
  };

  function getItemData() {
    fetch(`/api/postitems`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((e) => console.log(e.message));
  }
  useEffect(() => {
    getSinglePostData();
    getItemData();
  }, []);

  const handleDeletePost = async (id: string) => {
    // Delete Post request
    try {
      const response = await fetch(`/api/postitems/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = response.status;
      if (result === 200) {
        console.log("Success", result);
        router.push(`/postitems`);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <main id="main">
      <section className="single-post-content">
        <div className="container">
          <div className="row">
            <div className="col-md-9 post-content">
              {item && item.category !== "" ? (
                <div className="single-post">
                  <div className="post-meta">
                    <span className="date">{item.category}</span>
                    <span className="mx-1">
                      <i className="bi bi-dot"></i>
                    </span>
                    <span>
                      {new Date(item.date).toLocaleDateString("en-US")}
                    </span>
                  </div>
                  <h1 className="mb-5">{item.title}</h1>
                  <p>
                    <span className="firstcharacter">
                      {item.brief && item.brief.charAt(0)}
                    </span>
                    {item.brief && item.brief.substring(1)}
                  </p>

                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Vero temporibus repudiandae, inventore pariatur numquam
                    cumque possimus exercitationem? Nihil tempore odit ab minus
                    eveniet praesentium, similique blanditiis molestiae ut saepe
                    perspiciatis officia nemo, eos quae cumque. Accusamus fugiat
                    architecto rerum animi atque eveniet, quo, praesentium
                    dignissimos
                  </p>
                  <figure className="my-4">
                    {/* <Image
                      src={`/${item.img}`}
                      alt=""
                      className="img-fluid"
                      width={100}
                      height={100}
                      layout="responsive"
                    /> */}
                    {<img src={`/${item.img}`} alt="" className="img-fluid" />}
                    <figcaption>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Mollitia tenetur aut voluptatem cupiditate cum animi et.
                    </figcaption>
                  </figure>
                  <p>
                    Vestibulum neque ante, hendrerit vitae interdum nec, mattis
                    ac ante. Donec a dui mauris. Ut aliquet neque ligula, a
                    elementum lacus dignissim nec. Donec molestie, enim eu
                    suscipit aliquam, arcu lectus condimentum est, quis eleifend
                    nulla orci at erat. Nulla volutpat justo dolor, vitae
                    imperdiet purus lacinia vel. Nunc suscipit ligula et nunc
                    tempor efficitur. Proin ut lectus dapibus, posuere metus
                    congue, egestas ex. Ut tempor justo nibh, ac porttitor magna
                    placerat consequat. Donec sapien orci, tristique ullamcorper
                    congue eu, imperdiet eu metus. Aliquam lorem ex, vehicula
                    eget leo eu, imperdiet suscipit nunc.
                  </p>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. At
                    quaerat cum sint enim accusantium molestiae? Omnis molestias
                    beatae at quis, dignissimos ad, dicta saepe veniam fuga
                    animi, laborum optio voluptates.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis in nulla nec arcu molestie consectetur elementum
                    molestie justo. Nullam vitae nulla ac tortor rhoncus feugiat
                    eu non dui. Duis molestie quam urna, ut ornare nunc
                    sollicitudin in. Mauris sed rutrum metus, id pellentesque
                    velit. Aenean ut neque elit. Vivamus id mattis dolor. Nulla
                    dignissim aliquam velit, ut lobortis mi imperdiet et. Morbi
                    ut elit ullamcorper, accumsan metus ut, imperdiet mi.
                    Pellentesque nec ullamcorper lorem. Nunc tempor quam non leo
                    consequat, sit amet viverra nibh hendrerit. Pellentesque nec
                    elit vitae lorem egestas maximus vel vitae nunc. Mauris nec
                    rhoncus magna. Quisque tempor massa ut dolor semper, ut
                    scelerisque lacus viverra. Morbi aliquam nibh scelerisque
                    pretium sollicitudin. Nulla lacinia tortor sed dolor
                    interdum, eget pretium purus pellentesque. Nulla at nulla id
                    enim mattis volutpat id eget nisi. Duis libero tellus,
                    iaculis quis est eget, consectetur ultrices mauris.
                  </p>
                  <div className="d-flex justify-content-center gap-4">
                    <a
                      className="btn btn-primary"
                      onClick={() => handleDeletePost(id)}
                    >
                      <i className="bi bi-trash"></i>
                    </a>
                    <Link
                      href={`/createpostitem/${id}`}
                      className="btn btn-primary"
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>
                  </div>
                </div>
              ) : (
                <Preloader />
              )}
            </div>
            <div className="col-md-3">
              <div className="aside-block">
                <ul className="nav nav-pills custom-tab-nav mb-4">
                  {tabs.map((tab) => (
                    <li className="nav-item" key={tab.id}>
                      <button
                        className={`nav-link ${
                          tab.active ? "active" : undefined
                        }`}
                        onClick={() => handleTabActive(tab.id)}
                      >
                        {tab.name}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="tab-content">
                  <div
                    className={`tab-pane fade ${
                      tabs[0].active ? "show active" : ""
                    }`}
                  >
                    {items.slice(0, 6).map((item: PostProps) => (
                      <SidePostItem key={item._id} item={item} />
                    ))}
                  </div>
                  <div
                    className={`tab-pane fade ${
                      tabs[1].active ? "show active" : ""
                    }`}
                  >
                    {items.slice(6, 12).map((item: PostProps) => (
                      <SidePostItem key={item._id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="aside-block">
                <h3 className="aside-title">Video</h3>
                <div className="video-post">
                  <a
                    target="_blank"
                    href="https://youtu.be/kCwZl3wo9tY?si=LlaYGfbE_max3bBg"
                    className="link-video"
                  >
                    <span className="bi-play-fill"></span>
                    <img
                      src="/assets/img/post-landscape-6.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
