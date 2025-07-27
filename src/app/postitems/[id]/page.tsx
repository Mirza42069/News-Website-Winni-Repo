'use client';

import { initialPost } from '@/sections/Posts';
import React, {useState, useEffect} from 'react'
import './style.css';
import Image from 'next/image';

export default function Postitem({params}: {params: {id: string} }) {
  const id: string = params.id;

  const [item, setItem] = useState(initialPost);

  const getSinglePostData = ()=>{
    fetch(`/api/postitems/${id}`)
     .then(res=>res.json())
     .then(data => setItem(data))
     .catch(e=>console.log(e.message));
  };

  useEffect(()=>{
    getSinglePostData();
  },[]);

  return (
    <main id="main">
      <section className="single-post-content">
        <div className="container">
          <div className="row">
            <div className="col-md-9 post-content">
              <div className="single-post">
                <div className="post-meta">
                  <span className="date">{item.category}</span>
                  <span className="mx-1">
                    <i className="bi bi-dot"></i>
                  </span>
                  <span>{new Date(item.date).toLocaleDateString('en-US')}</span>
                </div>
                <h1 className='mb-5'>{item.title}</h1>
                <p>
                  <span className="firstcharacter">
                    {item.brief && item.brief.charAt(0)}
                  </span>
                  {item.brief && item.brief.substring(1)}
                </p>

                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero temporibus repudiandae, 
                  inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus 
                  eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo, 
                  eos quae cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos
                </p>
                <figure className='my-4'>
                    <Image 
                      src={`/${item.img}`}
                      alt=""
                      className="img-fluid"
                      width={100}
                      height={100}
                      layout='responsive'
                    />
                  <figcaption>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Mollitia tenetur aut voluptatem cupiditate cum animi et.
                  </figcaption>
                </figure>
                <p>
                  Vestibulum neque ante, hendrerit vitae interdum nec, mattis 
                  ac ante. Donec a dui mauris. Ut aliquet neque ligula, a elementum 
                  lacus dignissim nec. Donec molestie, enim eu suscipit aliquam, arcu 
                  lectus condimentum est, quis eleifend nulla orci at erat. Nulla volutpat 
                  justo dolor, vitae imperdiet purus lacinia vel. Nunc suscipit ligula et 
                  nunc tempor efficitur. Proin ut lectus dapibus, posuere metus congue, 
                  egestas ex. Ut tempor justo nibh, ac porttitor magna placerat consequat. 
                  Donec sapien orci, tristique ullamcorper congue eu, imperdiet eu metus. 
                  Aliquam lorem ex, vehicula eget leo eu, imperdiet suscipit nunc.
                </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                  At quaerat cum sint enim accusantium molestiae? Omnis molestias 
                  beatae at quis, dignissimos ad, dicta saepe veniam fuga animi, 
                  laborum optio voluptates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
  
}
