"use client";

import Image from "next/image";
import {
  Mail,
  MapPin,
  Twitter,
  GitlabIcon as GitHub,
  Linkedin,
} from "lucide-react";
import Sidebar from "@/components/shared/Sidebar";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function ProfilePage() {
  const user = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Sidebar>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Hero section */}
          <div className="bg-white shadow-xl sm:rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="sm:flex sm:space-x-5">
                  <div className="flex-shrink-0">
                    <Image
                      className="mx-auto h-20 w-20 rounded-full"
                      src={(user.user?.imageUrl as string) || "/file.svg"}
                      alt="Profile picture"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                    <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                      {user.user?.fullName}
                    </p>
                    <p className="text-sm font-medium text-gray-600">
                      Frontend Developer
                    </p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <MapPin
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      Nepal
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex justify-center sm:mt-0">
                  <Link
                    href="https://www.pawanawasthi.com.np"
                    target="_blank"
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Mail
                      className="mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Contact me
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 bg-gray-50 px-4 py-4 sm:px-6">
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-6 w-6" aria-hidden="true" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">GitHub</span>
                  <GitHub className="h-6 w-6" aria-hidden="true" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-6 w-6" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Bio section */}
          <div className="mt-8 bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium leading-6 text-gray-900">
                Bio
              </h2>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>A passionate Engineering Student.</p>
              </div>
            </div>
          </div>

          {/* Skills section */}
          <div className="mt-8 bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium leading-6 text-gray-900">
                Skills
              </h2>
              <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  "JavaScript",
                  "React",
                  "Node.js",
                  "TypeScript",
                  "GraphQL",
                  "AWS",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center justify-center rounded-md bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" aria-hidden="true" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <GitHub className="h-6 w-6" aria-hidden="true" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2024 Pawan Awasthi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </Sidebar>
  );
}
