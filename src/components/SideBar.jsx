import React from "react";
import { useEffect, useState } from "react";
import { Github, Linkedin, ShieldUser, LogOut } from "lucide-react";
import Selfie from "../assets/img/img_profile.webp";
import CssGridBackground from "./CssGridBackground";
import { supabase } from "../lib/supabaseClient";
import { getAdminSession } from "../lib/adminAuth";

const Sidebar = () => {
  const [session, setSession] = useState(null);
  const [authError, setAuthError] = useState("");
  useEffect(() => {
    const handleSession = (nextSession) => {
      const adminSession = getAdminSession(nextSession);
      setSession(adminSession);
      if (nextSession && !adminSession) {
        setAuthError("Admin access is restricted to the site owner.");
        supabase.auth.signOut();
      } else if (adminSession) {
        setAuthError("");
      }
    };

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => handleSession(session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      handleSession(session),
    );
    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async () => {
    if (session) {
      await supabase.auth.signOut();
    } else {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo: window.location.origin },
      });
      if (error) setAuthError("Admin access is restricted to the site owner.");
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
          />
          <div>
            <h1 className="text-2xl font-space-grotesk">John Paul San Diego</h1>
            <p className="text-gray-400">Computer Science</p>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-6">
          <p className="text-gray-300 text-lg leading-relaxed">
            I'm a Computer Science graduate from King's College London.{" "}
            <br className="mb-1" />
            SWE @ Pepsi Cola Products Philippines. Ex-MedibleGo. Ex-SmileShot.
          </p>
          {/* <button className="border border-white rounded-full px-4 py-2 text-sm hover:bg-white hover:text-black transition">
            More about Me
          </button> */}
        </div>

        {/* Social Links */}
        <div className="space-y-4 mt-auto">
          <nav aria-label="Social profiles">
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
          </nav>

          {/* Need this at the bottom-most whenever it's md and above. */}
          <div className="space-y-4">
            <div className="text-gray-400 text-sm">
              <p>johnpaul20030@gmail.com</p>
              <p>© 2026 John Paul San Diego</p>
            </div>

            <button
              type="button"
              onClick={handleAuth}
              aria-label={session ? "Admin logout" : "Admin login"}
              title={session ? "Admin logout" : "Admin login"}
              className="text-gray-400 text-sm hover:text-white transition flex items-center gap-3"
            >
              {session ? (
                <>
                  <LogOut className="w-5 h-5" />
                  Logout
                </>
              ) : (
                <ShieldUser className="w-5 h-5" />
              )}
            </button>
            {authError && (
              <p role="alert" className="text-gray-400 text-xs max-w-48">
                {authError}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
