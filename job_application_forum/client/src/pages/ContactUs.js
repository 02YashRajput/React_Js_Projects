import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can use state or other methods to manage form data
  };

  return (
    <div className='dark:bg-slate-800 min-h-screen min-w-screen text-slate-800 dark:text-slate-200 pt-36 text-2xl'>
      <Header />
      <div className='container mx-auto py-8'>
        <h1 className='text-2xl font-bold mb-4'>Contact Us</h1>
        <p className='mb-4'>Have a question or feedback? Reach out to us!</p>
        <form onSubmit={handleSubmit} className='max-w-lg'>
          <div className='mb-4'>
            <label htmlFor='name' className='block text-sm font-medium '>
              Your Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className='mt-1 block w-full rounded-md outline-none bg-inherit border border-slate-500 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium '>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='mt-1 block w-full  outline-none bg-inherit border border-slate-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='message' className='block text-sm font-medium '>
              Message
            </label>
            <textarea
              id='message'
              name='message'
              rows='4'
              className='mt-1 block w-full outline-none bg-inherit border border-slate-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            ></textarea>
          </div>
          <button
            type='submit'
            className='inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md'
          >
            Send Message
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
