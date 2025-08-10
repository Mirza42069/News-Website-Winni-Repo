'use client';

import React, { useState, useEffect } from 'react';
import Preloader from './Preloader';
import FooterPostItem from './FooterPostItem';
import Link from 'next/link';
import './footer.css';

export default function Footer() {
  const [items, setItems] = useState<any | []>([]);

  const getPostsData = () => {
    fetch(`/api/postitems`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(e => console.log(e.message));
  };

  useEffect(() => {
    getPostsData();
  }, []);

  const categories: string[] = [
    'Business',
    'Culture',
    'Sport',
    'Food',
    'Politics',
    'Celebrity',
    'Startups',
    'Travel',
  ];

  const navs = ['Home', 'Blog', 'News', 'Post', 'About', 'Contact'];
  const scis = ['twitter-x', 'facebook', 'instagram', 'skype', 'linkedin'];

  return (
    <footer id="footer" className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4">
              <h3 className="footer-heading">Digital News</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                ab, perspiciatis beatae autem deleniti voluptate nulla a
                dolores, exercitationem eveniet libero laudantium recusandae
                officiis qui aliquid blanditiis omnis quae. Explicabo?
              </p>
              <p>
                <Link href="/about" className="footer-link-more">
                  Learn More
                </Link>
              </p>
            </div>
            <div className="col-6 col-lg-2">
              <h3 className="footer-heading">Navigation</h3>
              <ul className="footer-links list-unstyled">
                {navs.map((nav, index) => (
                  <li key={index}>
                    <a href="#">
                      <i className="bi bi-chevron-right"></i> {nav}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-6 col-lg-2">
              <h3 className="footer-heading">Categories</h3>
              <ul className="footer-links list-unstyled">
                {categories.map((category, index) => (
                  <li key={index}>
                    <a href="#">
                      <i className="bi bi-chevron-right"></i> {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-lg-4">
              <h3 className="footer-heading">Recent Posts</h3>

              <ul className="footer-links footer-blog-entry list-unstyled">
                {items && items.length > 0 ? (
                  items
                    .slice(-4)
                    .map(
                      (item: {
                        _id: string;
                        img: string;
                        category: string;
                        date: string;
                        title: string;
                        brief: string;
                        avatar: string;
                        author: string;
                      }) => <FooterPostItem key={item._id} item={item} />
                    )
                ) : (
                  <Preloader />
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-legal">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <div className="copyright">
                © Copyright{' '}
                <strong>
                  <span>DigitalNews</span>
                </strong>
                . All Rights Reserved
              </div>

              <div className="credits">
                Designed by <a href="#">DStudio Technology</a>
              </div>
            </div>

            <div className="col-md-6">
              <div className="social-links mb-3 mb-lg-0 text-center text-md-end">
                {scis.map((sci, index) => (
                  <a key={index} href="#" className={sci}>
                    <i className={`bi bi-${sci}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
