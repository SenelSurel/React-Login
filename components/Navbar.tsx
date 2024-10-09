"use client";
import React from "react";
import Link from "@/node_modules/next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session }: any = useSession();
    return (
        <div className="navbar">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Platform</a>
                <Link href="/">
                    Ev
                </Link>
            </div>
        <div className="flex-none">
          {!session ? (
            <>
              <Link href="/login" className="btn btn-primary"> Giriş yap</Link>
              <Link href="/register" className="btn btn-secondary ml-2"> Kaydol</Link>
            </>
          ) : (
            <>
              {session.user?.email}
            
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.freepik.com/free-vector/cool-astronaut-with-baseball-bat-jacket-cartoon-vector-icon-illustration-science-sport-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3320.jpg" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li>
                    <a className="justify-between">
                      Profil
                      <span className="badge">Yeni</span>
                    </a>
                  </li>
                  <li><a>Settings</a></li>
                  <li><button onClick={() => { signOut(); }}>Log Out</button></li>
                </ul>
              </div>
            </>)}
                
          </div>
          </div>
    )};

export default Navbar;