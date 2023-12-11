import { Inter } from "next/font/google";
import LoginForm from "@/components/LoginForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`container mx-auto mt-10 ${inter.className}`}>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-gray-900">
              Welcome to ChapApp
            </h1>
            <p className="leading-relaxed mt-4">
              A simple chat application built with Next.js, Node.js, and
              Socket.io. <br />
              Login to begin to chat or register for an account.
            </p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <LoginForm></LoginForm>
          </div>
        </div>
      </section>
    </div>
  );
}
