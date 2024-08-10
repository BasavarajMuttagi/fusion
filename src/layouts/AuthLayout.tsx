import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-neutral-900 bg-gradient-to-r from-black to-purple-800/40">
      {children}
    </div>
  );
};

export default AuthLayout;
