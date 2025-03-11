import React from 'react';
import Header from '../components/Header';
import Blogs from '../components/Blogs';
import Footer from '../components/Footer';     
   
const BlogPage = () => {
    return (
        <div>
             <Header/>
                <Blogs/>
             <Footer/>
        </div>
    );
};
export default BlogPage;