import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { tokenType } from "../routes/Private";
import useFusionStore from "../store";

const HandleRedirect = () => {
  const { setDisplayName, setToken, setEmail } = useFusionStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const success = searchParams.get("success");
    const error = searchParams.get("error");

    if (token) {
      try {
        const decodedToken = jwtDecode(token) as tokenType;
        setToken(token);
        setDisplayName(decodedToken.name);
        setEmail(decodedToken.email);
        navigate("/", { replace: true });
        location.reload();
      } catch (error) {
        navigate("/login", {
          state: { error: "Authentication failed. Please try again." },
          replace: true,
        });
        console.log(error);
      }
    } else if (success === "false") {
      navigate("/login", {
        state: { error: error || "Authentication failed. Please try again." },
        replace: true,
      });
    } else {
      console.error("No token found in URL");
      navigate("/login", {
        state: {
          error: "No authentication token found. Please try again.",
          replace: true,
        },
      });
    }
  }, [searchParams, setToken, setDisplayName, navigate, setEmail]);

  return (
    <div className="h-screen w-full text-neutral-400 flex items-center justify-center text-xl font-medium">
      <div>Processing authentication...</div>
    </div>
  );
};

export default HandleRedirect;
