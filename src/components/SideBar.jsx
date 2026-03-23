import React from "react";
import { useEffect, useState } from "react";
import { Github, Linkedin, ShieldUser, LogOut } from "lucide-react";
import Selfie from "../assets/img/img_profile.png";
import CssGridBackground from "./CssGridBackground";
import { supabase } from "../lib/supabaseClient";

const Sidebar = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session),
    );
    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async () => {
    if (session) {
      await supabase.auth.signOut();
    } else {
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo: window.location.origin },
      });
    }
  };

  return (
    <div className="lg:h-screen lg:max-h-screen relative lg:sticky top-0 overflow-hidden font-work-sans z-50">
      {/* Background Pattern */}
      <CssGridBackground />

      {/* Sidebar Content */}
      <div className="flex flex-col p-6 relative z-10 h-full overflow-y-auto gap-8">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <img
            src={Selfie}
            alt="John Paul San Diego"
            className="rounded-full w-16 h-16 object-cover"
            loading="lazy"
          />
          <div>
            <h1 className="text-2xl font-space-grotesk">John Paul San Diego</h1>
            <p className="text-gray-400">Computer Science</p>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-6">
          <p className="text-gray-300 text-lg leading-relaxed">
            I'm a Computer Science student at King's College London.{" "}
            <br className="mb-1" />
            Software engineer. KCL Tech Lead. King's Labs.
          </p>
          {/* <button className="border border-white rounded-full px-4 py-2 text-sm hover:bg-white hover:text-black transition">
            More about Me
          </button> */}
        </div>

        {/* Social Links */}
        <div className="space-y-4 mt-auto">
          {/* Social Links & Admin Login Side-to-Side */}
          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com/in/paul-san-diego/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-100 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/jd-paul"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-100 hover:text-white transition"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          {/* Need this at the bottom-most whenever it's md and above. */}
          <div className="space-y-4">
            <div className="text-gray-400 text-sm">
              <p>johnpaul20030@gmail.com</p>
              <p>© 2025 John Paul San Diego</p>
            </div>

            <button
              onClick={handleAuth}
              className="text-gray-400 text-sm hover:text-white transition flex items-center gap-3"
            >
              {session ? (
                <>
                  <LogOut className="w-5 h-5" />
                  Logout
                </>
              ) : (
                <>
                  <ShieldUser className="w-5 h-5" />
                  Admin Login
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
