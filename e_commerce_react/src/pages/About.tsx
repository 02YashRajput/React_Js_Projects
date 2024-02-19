import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
function About() {
  return (
    <div className="flex flex-col justify-between pt-24 min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col px-10 w-[60%] justify-center items-center mb-10  gap-5">

        <h1 className="text-3xl font-bold"> About Us </h1> Welcome to Fake
        Store, where we're passionate about providing you with the best online
        shopping experience. Our mission is to offer high-quality products,
        exceptional customer service, and a seamless shopping journey that
        delights and exceeds your expectations.{" "}
        <h1 className="text-3xl font-bold">Our Story</h1> Fake Store was founded
        with a vision to revolutionize the way people shop online. Our journey
        began with a simple idea: to create a platform where customers can
        discover, explore, and purchase a wide range of products from the
        comfort of their homes. Since our inception, we've been dedicated to
        curating an extensive selection of products across various categories,
        from electronics and fashion to home essentials and beyond. Driven by
        our commitment to innovation and customer satisfaction, we continuously
        strive to enhance your shopping experience. Whether you're looking for
        the latest gadgets, trendy fashion pieces, or everyday essentials, we're
        here to make your online shopping journey enjoyable and convenient.{" "}
        <h1 className="text-3xl font-bold">Our Values</h1> At Fake Store, our
        values are at the core of everything we do.{" "}
        <ol className="list-decimal">
          <li>
            {" "}
            Customer-Centricity: We prioritize your needs and preferences,
            striving to provide personalized service and tailored
            recommendations.{" "}
          </li>{" "}
          <li>
            {" "}
            Quality Assurance: We're committed to offering only the highest
            quality products sourced from trusted suppliers and brands.
          </li>{" "}
          <li>
            {" "}
            Transparency: We believe in transparency and honesty in all our
            dealings, ensuring clear communication and fair practices at every
            step.
          </li>{" "}
          <li>
            Innovation: We embrace innovation and technology to enhance your
            shopping experience, constantly exploring new ways to streamline
            processes and improve efficiency.
          </li>{" "}
          <li>
            Community Engagement: We actively engage with our community,
            listening to feedback and continuously evolving to meet your
            evolving needs and preferences.
          </li>{" "}
        </ol>{" "}
        <h1 className="text-3xl font-bold">Our Team</h1> Behind Fake Store is a
        dedicated team of professionals who are passionate about delivering
        excellence. From our customer service representatives to our tech
        experts and logistics team, each member plays a crucial role in ensuring
        your satisfaction. We love hearing from you! Whether you have a
        question, feedback, or just want to say hello, don't hesitate to reach
        out to us. You can contact us through our customer service channels, and
        we'll be more than happy to assist you. Thank you for choosing Fake
        Store. Happy shopping!
      </div>
        </div>
      <Footer />
    </div>
  );
}

export default About;
