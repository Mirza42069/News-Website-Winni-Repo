import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main">
      <section id="not-found" className="not-found">
        <div className="container-fluid d-flex flex-column">
          <div className="row align-items-center justify-content-center min-vh-100">
            <div className="col-md-9 col-lg-6 my-5">
              <div className="text-center error-page">
                <h1 className="mb-0 text-secondary">404</h1>
                <h2 className="mb-4 text-white">
                  Sorry, something went wrong!
                </h2>
                <p className="w-sm-80 mx-auto mb-4 text-white">
                  This page is incidentally inaccessible because of support. We
                  will back very before long much obliged for your understanding
                </p>
                <div>
                  <Link href="/" className="btn btn-primary btn-lg">
                    Return Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
