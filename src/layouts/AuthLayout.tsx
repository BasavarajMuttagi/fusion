import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-5 flex flex-col min-h-screen justify-center items-center bg-neutral-900 bg-gradient-to-r from-black to-purple-800/40">
      {children}
    </div>
  );
};

export default AuthLayout;
